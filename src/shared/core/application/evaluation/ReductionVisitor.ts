import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";

import type {
  Abs,
  App,
  Ascribe,
  Case,
  DummyAbstraction,
  GlobalDecl,
  IfCondition,
  Inl,
  Inr,
  Let,
  Lit,
  Program,
  Record,
  RecordProjection,
  Sequencing,
  Term,
  Tuple,
  TupleProjection,
  Type,
  Var,
  Variant,
  VariantCase,
} from "@/shared/core/domain/ast";

import {EvaluationStrategy, type ReductionStep,} from "@/shared/core/application/evaluation/type.ts";

const isUnitLiteral = (term: Term): boolean =>
  term.kind === "Lit" && (term.value === "unit" || term.value === "Unit");

const isTrueLiteral = (term: Term): boolean =>
  term.kind === "Lit" && (term.value === "true" || term.value === "True");

const isFalseLiteral = (term: Term): boolean =>
  term.kind === "Lit" && (term.value === "false" || term.value === "False");

export class ReductionVisitor extends AstVisitor<ReductionStep | null> {

  private boundVariables = new Map<string, number>();

  constructor(
    private readonly strategy: EvaluationStrategy,
    private readonly globals: ReadonlyMap<string, Term>,
  ) {
    super();
  }

  /**
   * Performs exactly one reduction step.
   */
  public reduce(term: Term): ReductionStep | null {
    return this.visit(term);
  }

  protected override visitVar(
    node: Var,
  ): ReductionStep | null {
    if (this.isBound(node.name)) {
      return null;
    }

    const definition = this.globals.get(node.name);

    if (!definition || !definition.id) {
      return null;
    }

    const after = this.cloneTermWithFreshIds(definition);
    return {
      before: node,
      after,
      selectedId: node.id,
      resultId: after.id,
    };
  }

  protected override visitLit(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _node: Lit,
  ): ReductionStep | null {
    return null;
  }

  protected override visitAbs(
    node: Abs,
  ): ReductionStep | null {
    /*
     * Normal-order reduction continues under abstractions.
     * Call by name and call by value stop at an abstraction.
     */
    if (this.strategy !== EvaluationStrategy.NORMAL) {
      return null;
    }

    this.addBound(node.param);

    try {
      const bodyStep = this.visit(node.body);

      if (!bodyStep) {
        return null;
      }

      return {
        before: node,
        after: {
          ...node,
          body: bodyStep.after,
        },
        selectedId: bodyStep.selectedId,
        resultId: bodyStep.resultId,
      };
    } finally {
      this.removeBound(node.param);
    }
  }

  protected override visitApp(
    node: App,
  ): ReductionStep | null {
    const isBetaRedex = node.func.kind === "Abs" || node.func.kind === "DummyAbstraction";

    /*
     * Normal order and call by name reduce an outer
     * beta-redex immediately.
     */
    if (
      isBetaRedex &&
      this.strategy !== EvaluationStrategy.CALL_BY_VALUE
    ) {
      return this.betaReduce(node);
    }

    /*
     * All strategies first attempt to reduce the
     * function side.
     */
    const functionStep = this.visit(node.func);

    if (functionStep) {
      return {
        before: node,
        after: {
          ...node,
          func: functionStep.after,
        },
        selectedId: functionStep.selectedId,
        resultId: functionStep.resultId,
      };
    }

    /*
     * Call by name never independently evaluates
     * the argument.
     */
    if (this.strategy === EvaluationStrategy.CALL_BY_NAME) {
      return null;
    }

    /*
     * Normal order checks the argument after the
     * function cannot reduce.
     */
    if (this.strategy === EvaluationStrategy.NORMAL) {
      const argumentStep = this.visit(node.arg);

      if (!argumentStep) {
        return null;
      }

      return {
        before: node,
        after: {
          ...node,
          arg: argumentStep.after,
        },
        selectedId: argumentStep.selectedId,
        resultId: argumentStep.resultId,
      };
    }

    /*
     * Call by value requires the function to be a value
     * before evaluating the argument.
     */
    if (!this.isValue(node.func)) {
      return null;
    }

    if (!this.isValue(node.arg)) {
      const argumentStep = this.visit(node.arg);

      if (!argumentStep) {
        return null;
      }

      return {
        before: node,
        after: {
          ...node,
          arg: argumentStep.after,
        },
        selectedId: argumentStep.selectedId,
        resultId: argumentStep.resultId,
      };
    }

    /*
     * Under call by value, beta-reduction happens only
     * after the argument is a value.
     */
    if (isBetaRedex) {
      return this.betaReduce(node);
    }

    /*
     * For example, applying a literal as a function
     * produces a stuck term.
     */
    return null;
  }

  private betaReduce(node: App): ReductionStep {
    if (node.func.kind === "DummyAbstraction") {
      /*
       * The parameter is anonymous and never referenced,
       * so the argument is simply discarded.
       */
      const after = this.cloneTermWithFreshIds(node.func.body);
      return {
        before: node,
        after,
        selectedId: node.id,
        resultId: after.id,
      };
    }

    if (node.func.kind !== "Abs") {
      throw new Error(
        `Node ${node.id} is not a beta-redex`,
      );
    }

    const after = this.substitute(
      node.func.body,
      node.func.param,
      node.arg,
    );

    return {
      before: node,
      after,
      selectedId: node.id,
      resultId: after.id,
    };
  }

  protected override visitInl(node: Inl): ReductionStep | null {
    const step = this.visit(node.term);
    if (!step) return null;
    return {
      before: node,
      after: {...node, term: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitInr(node: Inr): ReductionStep | null {
    const step = this.visit(node.term);
    if (!step) return null;
    return {
      before: node,
      after: {...node, term: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitIfCondition(node: IfCondition): ReductionStep | null {
    if (isTrueLiteral(node.condition)) {
      const after = this.cloneTermWithFreshIds(node.then);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    if (isFalseLiteral(node.condition)) {
      const [nextElif, ...restElif] = node.elif ?? [];

      if (nextElif) {
        const after: IfCondition = {
          ...node,
          id: crypto.randomUUID(),
          condition: nextElif.condition,
          then: nextElif.then,
          elif: restElif.length > 0 ? restElif : undefined,
        };
        return {before: node, after, selectedId: node.id, resultId: after.id};
      }

      const after = node.else
        ? this.cloneTermWithFreshIds(node.else)
        : ({kind: "Lit", id: crypto.randomUUID(), value: "unit"} as Lit);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.condition);
    if (!step) return null;
    return {
      before: node,
      after: {...node, condition: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitCase(node: Case): ReductionStep | null {
    if (node.variable.kind === "Inl" && this.isValue(node.variable)) {
      const after = this.substitute(node.inl.term, node.inl.variable, node.variable.term);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    if (node.variable.kind === "Inr" && this.isValue(node.variable)) {
      const after = this.substitute(node.inr.term, node.inr.variable, node.variable.term);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.variable);
    if (!step) return null;
    return {
      before: node,
      after: {...node, variable: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitVariantCase(node: VariantCase): ReductionStep | null {
    if (node.variable.kind === "Variant" && this.isValue(node.variable)) {
      const variantValue = node.variable;

      for (const c of node.cases) {
        const field = variantValue.variants.find((v) => v.label === c.label);
        if (field) {
          const after = this.substitute(c.body, c.variable, field.term);
          return {before: node, after, selectedId: node.id, resultId: after.id};
        }
      }

      // No matching case label — stuck.
      return null;
    }

    const step = this.visit(node.variable);
    if (!step) return null;
    return {
      before: node,
      after: {...node, variable: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitVariant(node: Variant): ReductionStep | null {
    for (let i = 0; i < node.variants.length; i++) {
      const entry = node.variants[i];
      if (this.isValue(entry.term)) continue;

      const step = this.visit(entry.term);
      if (!step) return null;

      const variants = [...node.variants];
      variants[i] = {...entry, term: step.after};
      return {
        before: node,
        after: {...node, variants},
        selectedId: step.selectedId,
        resultId: step.resultId,
      };
    }

    return null;
  }

  protected override visitAscribe(node: Ascribe): ReductionStep | null {
    if (this.isValue(node.term)) {
      const after = this.cloneTermWithFreshIds(node.term);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.term);
    if (!step) return null;
    return {
      before: node,
      after: {...node, term: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitTuple(node: Tuple): ReductionStep | null {
    for (let i = 0; i < node.elements.length; i++) {
      const element = node.elements[i];
      if (this.isValue(element)) continue;

      const step = this.visit(element);
      if (!step) return null;

      const elements = [...node.elements];
      elements[i] = step.after;
      return {
        before: node,
        after: {...node, elements},
        selectedId: step.selectedId,
        resultId: step.resultId,
      };
    }

    return null;
  }

  protected override visitTupleProjection(node: TupleProjection): ReductionStep | null {
    if (node.tuple.kind === "Tuple" && this.isValue(node.tuple)) {
      const element = node.tuple.elements[node.index - 1];
      if (!element) return null;

      const after = this.cloneTermWithFreshIds(element);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.tuple);
    if (!step) return null;
    return {
      before: node,
      after: {...node, tuple: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitRecord(node: Record): ReductionStep | null {
    for (let i = 0; i < node.fields.length; i++) {
      const field = node.fields[i];
      if (this.isValue(field.term)) continue;

      const step = this.visit(field.term);
      if (!step) return null;

      const fields = [...node.fields];
      fields[i] = {...field, term: step.after};
      return {
        before: node,
        after: {...node, fields},
        selectedId: step.selectedId,
        resultId: step.resultId,
      };
    }

    return null;
  }

  protected override visitRecordProjection(node: RecordProjection): ReductionStep | null {
    if (node.term.kind === "Record" && this.isValue(node.term)) {
      const field = node.term.fields.find((f) => f.label === node.label);
      if (!field) return null;

      const after = this.cloneTermWithFreshIds(field.term);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.term);
    if (!step) return null;
    return {
      before: node,
      after: {...node, term: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitSequencing(node: Sequencing): ReductionStep | null {
    if (isUnitLiteral(node.first)) {
      const after = this.cloneTermWithFreshIds(node.second);
      return {before: node, after, selectedId: node.id, resultId: after.id};
    }

    const step = this.visit(node.first);
    if (!step) return null;
    return {
      before: node,
      after: {...node, first: step.after},
      selectedId: step.selectedId,
      resultId: step.resultId,
    };
  }

  protected override visitDummyAbstraction(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _node: DummyAbstraction,
  ): ReductionStep | null {
    // A dummy abstraction is a function value; only application reduces it.
    return null;
  }

  protected override visitLet(node: Let): ReductionStep | null {
    /*
     * `let x = t1 in t2` is a redex the moment it's formed — unlike App,
     * it never needs to wait for anything to become an abstraction.
     * Normal order and call by name substitute immediately, exactly like
     * a beta-redex under those two strategies (see visitApp).
     */
    if (this.strategy !== EvaluationStrategy.CALL_BY_VALUE) {
      return this.letReduce(node);
    }

    /*
     * Call by value requires the bound value to be a value before
     * substituting it into the body.
     */
    if (!this.isValue(node.value)) {
      const valueStep = this.visit(node.value);

      if (!valueStep) {
        return null;
      }

      return {
        before: node,
        after: {
          ...node,
          value: valueStep.after,
        },
        selectedId: valueStep.selectedId,
        resultId: valueStep.resultId,
      };
    }

    return this.letReduce(node);
  }

  private letReduce(node: Let): ReductionStep {
    const after = this.substitute(node.body, node.name, node.value);

    return {
      before: node,
      after,
      selectedId: node.id,
      resultId: after.id,
    };
  }

  /**
   * Capture-avoiding substitution:
   *
   * term[variable := replacement]
   */
  private substitute(
    term: Term,
    variable: string,
    replacement: Term,
  ): Term {
    switch (term.kind) {
      case "Var":
        if (term.name !== variable) {
          return term;
        }

        /*
         * A fresh copy is required for every occurrence.
         * Otherwise duplicated substituted terms would
         * contain duplicated node IDs.
         */
        return this.cloneTermWithFreshIds(replacement);

      case "Lit":
        return term;

      case "App":
        return {
          ...term,
          func: this.substitute(
            term.func,
            variable,
            replacement,
          ),
          arg: this.substitute(
            term.arg,
            variable,
            replacement,
          ),
        };

      case "Abs": {
        /*
         * The inner abstraction shadows the variable.
         *
         * (λx. M)[x := N] = λx. M
         */
        if (term.param === variable) {
          return term;
        }

        const replacementFreeVariables =
          this.getFreeVariables(replacement);

        /*
         * Alpha-conversion is required when the binder
         * could capture a free variable from replacement.
         */
        if (replacementFreeVariables.has(term.param)) {
          const unavailableNames = new Set([
            ...this.getAllNames(term.body),
            ...this.getAllNames(replacement),
            variable,
          ]);

          const freshParameter = this.createFreshName(
            term.param,
            unavailableNames,
          );

          const renamedBody = this.renameBoundVariable(
            term.body,
            term.param,
            freshParameter,
          );

          return {
            ...term,
            param: freshParameter,
            body: this.substitute(
              renamedBody,
              variable,
              replacement,
            ),
          };
        }

        return {
          ...term,
          body: this.substitute(
            term.body,
            variable,
            replacement,
          ),
        };
      }

      case "Inl":
      case "Inr":
        return {...term, term: this.substitute(term.term, variable, replacement)};

      case "IfCondition": {
        const next: IfCondition = {
          ...term,
          condition: this.substitute(term.condition, variable, replacement),
          then: this.substitute(term.then, variable, replacement),
        };
        if (term.elif) {
          next.elif = term.elif.map((b) => ({
            condition: this.substitute(b.condition, variable, replacement),
            then: this.substitute(b.then, variable, replacement),
          }));
        }
        if (term.else) {
          next.else = this.substitute(term.else, variable, replacement);
        }
        return next;
      }

      case "Case": {
        const scrutinee = this.substitute(term.variable, variable, replacement);
        const inl = this.substituteUnderBinder(term.inl.variable, term.inl.term, variable, replacement);
        const inr = this.substituteUnderBinder(term.inr.variable, term.inr.term, variable, replacement);
        return {
          ...term,
          variable: scrutinee,
          inl: {variable: inl.name, term: inl.body},
          inr: {variable: inr.name, term: inr.body},
        };
      }

      case "VariantCase": {
        const scrutinee = this.substitute(term.variable, variable, replacement);
        const cases = term.cases.map((c) => {
          const bound = this.substituteUnderBinder(c.variable, c.body, variable, replacement);
          return {label: c.label, variable: bound.name, body: bound.body};
        });
        return {...term, variable: scrutinee, cases};
      }

      case "Variant":
        return {
          ...term,
          variants: term.variants.map((v) => ({
            label: v.label,
            term: this.substitute(v.term, variable, replacement),
          })),
        };

      case "Ascribe":
        return {...term, term: this.substitute(term.term, variable, replacement)};

      case "TupleProjection":
        return {...term, tuple: this.substitute(term.tuple, variable, replacement)};

      case "RecordProjection":
        return {...term, term: this.substitute(term.term, variable, replacement)};

      case "Record":
        return {
          ...term,
          fields: term.fields.map((f) => ({
            label: f.label,
            term: this.substitute(f.term, variable, replacement),
          })),
        };

      case "Sequencing":
        return {
          ...term,
          first: this.substitute(term.first, variable, replacement),
          second: this.substitute(term.second, variable, replacement),
        };

      case "Tuple":
        return {...term, elements: term.elements.map((e) => this.substitute(e, variable, replacement))};

      case "DummyAbstraction":
        // The bound name is anonymous and never occurs free in the body.
        return {...term, body: this.substitute(term.body, variable, replacement)};

      case "Let": {
        // `let` only binds its own name within `body` — `value` is evaluated
        // in the outer scope, so it's substituted unconditionally.
        const value = this.substitute(term.value, variable, replacement);
        const bound = this.substituteUnderBinder(term.name, term.body, variable, replacement);
        return {...term, value, name: bound.name, body: bound.body};
      }
    }
  }

  /**
   * Substitutes under a named binder (used by Case/VariantCase branches),
   * alpha-converting the binder when it would capture a free variable of
   * the replacement — mirrors the Abs case of substitute().
   */
  private substituteUnderBinder(
    boundName: string,
    body: Term,
    variable: string,
    replacement: Term,
  ): {name: string; body: Term} {
    if (boundName === variable) {
      return {name: boundName, body};
    }

    const replacementFreeVariables = this.getFreeVariables(replacement);

    if (replacementFreeVariables.has(boundName)) {
      const unavailableNames = new Set([
        ...this.getAllNames(body),
        ...this.getAllNames(replacement),
        variable,
      ]);

      const freshName = this.createFreshName(boundName, unavailableNames);
      const renamedBody = this.renameBoundVariable(body, boundName, freshName);

      return {name: freshName, body: this.substitute(renamedBody, variable, replacement)};
    }

    return {name: boundName, body: this.substitute(body, variable, replacement)};
  }

  private isValue(term: Term): boolean {
    switch (term.kind) {
      case "Abs":
      case "Lit":
      case "Var":
      case "DummyAbstraction":
        return true;

      case "App":
      case "IfCondition":
      case "Case":
      case "VariantCase":
      case "Ascribe":
      case "TupleProjection":
      case "RecordProjection":
      case "Sequencing":
      case "Let":
        return false;

      case "Inl":
      case "Inr":
        return this.isValue(term.term);

      case "Tuple":
        return term.elements.every((e) => this.isValue(e));

      case "Record":
        return term.fields.every((f) => this.isValue(f.term));

      case "Variant":
        return term.variants.every((v) => this.isValue(v.term));
    }
  }

  private getFreeVariables(
    term: Term,
    bound: ReadonlySet<string> = new Set(),
  ): Set<string> {
    switch (term.kind) {
      case "Var":
        return bound.has(term.name)
          ? new Set()
          : new Set([term.name]);

      case "Lit":
        return new Set();

      case "App":
        return new Set([
          ...this.getFreeVariables(term.func, bound),
          ...this.getFreeVariables(term.arg, bound),
        ]);

      case "Abs": {
        const nextBound = new Set(bound);
        nextBound.add(term.param);

        return this.getFreeVariables(
          term.body,
          nextBound,
        );
      }

      case "Inl":
      case "Inr":
        return this.getFreeVariables(term.term, bound);

      case "IfCondition": {
        const sets = [
          this.getFreeVariables(term.condition, bound),
          this.getFreeVariables(term.then, bound),
        ];
        for (const b of term.elif ?? []) {
          sets.push(this.getFreeVariables(b.condition, bound), this.getFreeVariables(b.then, bound));
        }
        if (term.else) sets.push(this.getFreeVariables(term.else, bound));
        return new Set(sets.flatMap((s) => [...s]));
      }

      case "Case": {
        const inlBound = new Set(bound);
        inlBound.add(term.inl.variable);
        const inrBound = new Set(bound);
        inrBound.add(term.inr.variable);
        return new Set([
          ...this.getFreeVariables(term.variable, bound),
          ...this.getFreeVariables(term.inl.term, inlBound),
          ...this.getFreeVariables(term.inr.term, inrBound),
        ]);
      }

      case "VariantCase": {
        const branchSets = term.cases.map((c) => {
          const caseBound = new Set(bound);
          caseBound.add(c.variable);
          return this.getFreeVariables(c.body, caseBound);
        });
        return new Set([
          ...this.getFreeVariables(term.variable, bound),
          ...branchSets.flatMap((s) => [...s]),
        ]);
      }

      case "Variant":
        return new Set(term.variants.flatMap((v) => [...this.getFreeVariables(v.term, bound)]));

      case "Ascribe":
        return this.getFreeVariables(term.term, bound);

      case "TupleProjection":
        return this.getFreeVariables(term.tuple, bound);

      case "RecordProjection":
        return this.getFreeVariables(term.term, bound);

      case "Record":
        return new Set(term.fields.flatMap((f) => [...this.getFreeVariables(f.term, bound)]));

      case "Sequencing":
        return new Set([
          ...this.getFreeVariables(term.first, bound),
          ...this.getFreeVariables(term.second, bound),
        ]);

      case "Tuple":
        return new Set(term.elements.flatMap((e) => [...this.getFreeVariables(e, bound)]));

      case "DummyAbstraction":
        return this.getFreeVariables(term.body, bound);

      case "Let": {
        const nextBound = new Set(bound);
        nextBound.add(term.name);
        return new Set([
          ...this.getFreeVariables(term.value, bound),
          ...this.getFreeVariables(term.body, nextBound),
        ]);
      }
    }
  }

  /**
   * Renames occurrences bound by an outer abstraction.
   *
   * It stops when it encounters another abstraction
   * with the same parameter because that abstraction
   * introduces a new binding.
   */
  private renameBoundVariable(
    term: Term,
    oldName: string,
    newName: string,
  ): Term {
    switch (term.kind) {
      case "Var":
        return term.name === oldName
          ? {
            ...term,
            name: newName,
          }
          : term;

      case "Lit":
        return term;

      case "App":
        return {
          ...term,
          func: this.renameBoundVariable(
            term.func,
            oldName,
            newName,
          ),
          arg: this.renameBoundVariable(
            term.arg,
            oldName,
            newName,
          ),
        };

      case "Abs":
        /*
         * A nested abstraction with the same name
         * shadows the outer abstraction.
         */
        if (term.param === oldName) {
          return term;
        }

        return {
          ...term,
          body: this.renameBoundVariable(
            term.body,
            oldName,
            newName,
          ),
        };

      case "Inl":
      case "Inr":
        return {...term, term: this.renameBoundVariable(term.term, oldName, newName)};

      case "IfCondition": {
        const next: IfCondition = {
          ...term,
          condition: this.renameBoundVariable(term.condition, oldName, newName),
          then: this.renameBoundVariable(term.then, oldName, newName),
        };
        if (term.elif) {
          next.elif = term.elif.map((b) => ({
            condition: this.renameBoundVariable(b.condition, oldName, newName),
            then: this.renameBoundVariable(b.then, oldName, newName),
          }));
        }
        if (term.else) next.else = this.renameBoundVariable(term.else, oldName, newName);
        return next;
      }

      case "Case": {
        const inl = term.inl.variable === oldName
          ? term.inl
          : {variable: term.inl.variable, term: this.renameBoundVariable(term.inl.term, oldName, newName)};
        const inr = term.inr.variable === oldName
          ? term.inr
          : {variable: term.inr.variable, term: this.renameBoundVariable(term.inr.term, oldName, newName)};
        return {
          ...term,
          variable: this.renameBoundVariable(term.variable, oldName, newName),
          inl,
          inr,
        };
      }

      case "VariantCase":
        return {
          ...term,
          variable: this.renameBoundVariable(term.variable, oldName, newName),
          cases: term.cases.map((c) =>
            c.variable === oldName ? c : {...c, body: this.renameBoundVariable(c.body, oldName, newName)},
          ),
        };

      case "Variant":
        return {
          ...term,
          variants: term.variants.map((v) => ({...v, term: this.renameBoundVariable(v.term, oldName, newName)})),
        };

      case "Ascribe":
        return {...term, term: this.renameBoundVariable(term.term, oldName, newName)};

      case "TupleProjection":
        return {...term, tuple: this.renameBoundVariable(term.tuple, oldName, newName)};

      case "RecordProjection":
        return {...term, term: this.renameBoundVariable(term.term, oldName, newName)};

      case "Record":
        return {
          ...term,
          fields: term.fields.map((f) => ({...f, term: this.renameBoundVariable(f.term, oldName, newName)})),
        };

      case "Sequencing":
        return {
          ...term,
          first: this.renameBoundVariable(term.first, oldName, newName),
          second: this.renameBoundVariable(term.second, oldName, newName),
        };

      case "Tuple":
        return {...term, elements: term.elements.map((e) => this.renameBoundVariable(e, oldName, newName))};

      case "DummyAbstraction":
        return {...term, body: this.renameBoundVariable(term.body, oldName, newName)};

      case "Let":
        if (term.name === oldName) {
          // The let shadows the outer binder within its own body; the
          // bound value is still evaluated in the outer scope though.
          return {...term, value: this.renameBoundVariable(term.value, oldName, newName)};
        }
        return {
          ...term,
          value: this.renameBoundVariable(term.value, oldName, newName),
          body: this.renameBoundVariable(term.body, oldName, newName),
        };
    }
  }

  private getAllNames(term: Term): Set<string> {
    switch (term.kind) {
      case "Var":
        return new Set([term.name]);

      case "Lit":
        return new Set();

      case "App":
        return new Set([
          ...this.getAllNames(term.func),
          ...this.getAllNames(term.arg),
        ]);

      case "Abs":
        return new Set([
          term.param,
          ...this.getAllNames(term.body),
        ]);

      case "Inl":
      case "Inr":
        return this.getAllNames(term.term);

      case "IfCondition": {
        const sets = [this.getAllNames(term.condition), this.getAllNames(term.then)];
        for (const b of term.elif ?? []) sets.push(this.getAllNames(b.condition), this.getAllNames(b.then));
        if (term.else) sets.push(this.getAllNames(term.else));
        return new Set(sets.flatMap((s) => [...s]));
      }

      case "Case":
        return new Set([
          ...this.getAllNames(term.variable),
          term.inl.variable,
          ...this.getAllNames(term.inl.term),
          term.inr.variable,
          ...this.getAllNames(term.inr.term),
        ]);

      case "VariantCase":
        return new Set([
          ...this.getAllNames(term.variable),
          ...term.cases.flatMap((c) => [c.variable, ...this.getAllNames(c.body)]),
        ]);

      case "Variant":
        return new Set(term.variants.flatMap((v) => [...this.getAllNames(v.term)]));

      case "Ascribe":
        return this.getAllNames(term.term);

      case "TupleProjection":
        return this.getAllNames(term.tuple);

      case "RecordProjection":
        return this.getAllNames(term.term);

      case "Record":
        return new Set(term.fields.flatMap((f) => [...this.getAllNames(f.term)]));

      case "Sequencing":
        return new Set([...this.getAllNames(term.first), ...this.getAllNames(term.second)]);

      case "Tuple":
        return new Set(term.elements.flatMap((e) => [...this.getAllNames(e)]));

      case "DummyAbstraction":
        return this.getAllNames(term.body);

      case "Let":
        return new Set([
          term.name,
          ...this.getAllNames(term.value),
          ...this.getAllNames(term.body),
        ]);
    }
  }

  private createFreshName(
    originalName: string,
    unavailableNames: ReadonlySet<string>,
  ): string {
    let index = 1;
    let candidate = `${originalName}_${index}`;

    while (unavailableNames.has(candidate)) {
      index += 1;
      candidate = `${originalName}_${index}`;
    }

    return candidate;
  }

  private cloneTermWithFreshIds(term: Term): Term {
    switch (term.kind) {
      case "Var":
        return {
          ...term,
          id: crypto.randomUUID(),
        };

      case "Lit":
        return {
          ...term,
          id: crypto.randomUUID(),
        };

      case "App":
        return {
          ...term,
          id: crypto.randomUUID(),
          func: this.cloneTermWithFreshIds(term.func),
          arg: this.cloneTermWithFreshIds(term.arg),
        };

      case "Abs":
        return {
          ...term,
          id: crypto.randomUUID(),
          body: this.cloneTermWithFreshIds(term.body),
          paramType: this.cloneTypeWithFreshIds(term.paramType),
          type: term.type
            ? this.cloneTypeWithFreshIds(term.type)
            : undefined,
        };

      case "Inl":
        return {
          ...term,
          id: crypto.randomUUID(),
          term: this.cloneTermWithFreshIds(term.term),
          type: this.cloneTypeWithFreshIds(term.type),
        };

      case "Inr":
        return {
          ...term,
          id: crypto.randomUUID(),
          term: this.cloneTermWithFreshIds(term.term),
          type: this.cloneTypeWithFreshIds(term.type),
        };

      case "IfCondition": {
        const next: IfCondition = {
          ...term,
          id: crypto.randomUUID(),
          condition: this.cloneTermWithFreshIds(term.condition),
          then: this.cloneTermWithFreshIds(term.then),
        };
        if (term.elif) {
          next.elif = term.elif.map((b) => ({
            condition: this.cloneTermWithFreshIds(b.condition),
            then: this.cloneTermWithFreshIds(b.then),
          }));
        }
        if (term.else) next.else = this.cloneTermWithFreshIds(term.else);
        return next;
      }

      case "Case":
        return {
          ...term,
          id: crypto.randomUUID(),
          variable: this.cloneTermWithFreshIds(term.variable),
          inl: {variable: term.inl.variable, term: this.cloneTermWithFreshIds(term.inl.term)},
          inr: {variable: term.inr.variable, term: this.cloneTermWithFreshIds(term.inr.term)},
        };

      case "VariantCase":
        return {
          ...term,
          id: crypto.randomUUID(),
          variable: this.cloneTermWithFreshIds(term.variable),
          cases: term.cases.map((c) => ({
            label: c.label,
            variable: c.variable,
            body: this.cloneTermWithFreshIds(c.body),
          })),
        };

      case "Variant":
        return {
          ...term,
          id: crypto.randomUUID(),
          type: this.cloneTypeWithFreshIds(term.type),
          variants: term.variants.map((v) => ({label: v.label, term: this.cloneTermWithFreshIds(v.term)})),
        };

      case "Ascribe":
        return {
          ...term,
          id: crypto.randomUUID(),
          term: this.cloneTermWithFreshIds(term.term),
          type: this.cloneTypeWithFreshIds(term.type),
        };

      case "TupleProjection":
        return {...term, id: crypto.randomUUID(), tuple: this.cloneTermWithFreshIds(term.tuple)};

      case "RecordProjection":
        return {...term, id: crypto.randomUUID(), term: this.cloneTermWithFreshIds(term.term)};

      case "Record":
        return {
          ...term,
          id: crypto.randomUUID(),
          fields: term.fields.map((f) => ({label: f.label, term: this.cloneTermWithFreshIds(f.term)})),
        };

      case "Sequencing":
        return {
          ...term,
          id: crypto.randomUUID(),
          first: this.cloneTermWithFreshIds(term.first),
          second: this.cloneTermWithFreshIds(term.second),
        };

      case "Tuple":
        return {
          ...term,
          id: crypto.randomUUID(),
          elements: term.elements.map((e) => this.cloneTermWithFreshIds(e)),
        };

      case "DummyAbstraction":
        return {
          ...term,
          id: crypto.randomUUID(),
          body: this.cloneTermWithFreshIds(term.body),
          paramType: this.cloneTypeWithFreshIds(term.paramType),
          type: term.type ? this.cloneTypeWithFreshIds(term.type) : undefined,
        };

      case "Let":
        return {
          ...term,
          id: crypto.randomUUID(),
          value: this.cloneTermWithFreshIds(term.value),
          body: this.cloneTermWithFreshIds(term.body),
        };
    }
  }

  private cloneTypeWithFreshIds(type: Type): Type {
    switch (type.kind) {
      case "TyVar":
      case "TyMetaVar":
        return {
          ...type,
          id: crypto.randomUUID(),
        };

      case "TyArrow":
        return {
          ...type,
          id: crypto.randomUUID(),
          from: this.cloneTypeWithFreshIds(type.from),
          to: this.cloneTypeWithFreshIds(type.to),
        };

      case "TupleType":
        return {
          ...type,
          id: crypto.randomUUID(),
          elements: type.elements.map((e) => this.cloneTypeWithFreshIds(e)),
        };

      case "SumType":
        return {
          ...type,
          id: crypto.randomUUID(),
          left: this.cloneTypeWithFreshIds(type.left),
          right: this.cloneTypeWithFreshIds(type.right),
        };

      case "VariantType":
        return {
          ...type,
          id: crypto.randomUUID(),
          variants: type.variants.map((v) => ({label: v.label, type: this.cloneTypeWithFreshIds(v.type)})),
        };

      case "RecordType":
        return {
          ...type,
          id: crypto.randomUUID(),
          fields: type.fields.map((f) => ({label: f.label, type: this.cloneTypeWithFreshIds(f.type)})),
        };
    }
  }

  protected override visitProgram(
    node: Program,
  ): ReductionStep | null {
    return node.term
      ? this.visit(node.term)
      : null;
  }

  protected override visitTermDecl(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _node: GlobalDecl,
  ): ReductionStep | null {
    return null;
  }

  protected override visitTypeDecl(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _node: GlobalDecl,
  ): ReductionStep | null {
    return null;
  }

  protected override visitType(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _node: Type,
  ): ReductionStep | null {
    return null;
  }

  private addBound(name: string): void {
    const count = this.boundVariables.get(name) ?? 0;
    this.boundVariables.set(name, count + 1);
  }

  private removeBound(name: string): void {
    const count = this.boundVariables.get(name) ?? 0;

    if (count <= 1) {
      this.boundVariables.delete(name);
    } else {
      this.boundVariables.set(name, count - 1);
    }
  }

  private isBound(name: string): boolean {
    return (this.boundVariables.get(name) ?? 0) > 0;
  }
}
