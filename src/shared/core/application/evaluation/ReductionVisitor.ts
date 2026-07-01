import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";

import type {Abs, App, GlobalDecl, Lit, Program, Term, Type, Var,} from "@/shared/core/domain/ast";

import {EvaluationStrategy, type ReductionStep,} from "@/shared/core/application/evaluation/type.ts";

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
    const isBetaRedex = node.func.kind === "Abs";

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
    }
  }

  private isValue(term: Term): boolean {
    switch (term.kind) {
      case "Abs":
      case "Lit":
      case "Var":
        return true;

      case "App":
        return false;
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
          paramType: this.cloneTypeWithFreshIds(
            term.paramType,
          ),
          type: term.type
            ? this.cloneTypeWithFreshIds(term.type)
            : undefined,
        };
    }
  }

  private cloneTypeWithFreshIds(type: Type): Type {
    switch (type.kind) {
      case "TyVar":
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