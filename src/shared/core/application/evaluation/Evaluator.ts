import type {
  ASTNode,
  Program,
  Term,
} from "@/shared/core/domain/ast";

import {
  EvaluationStrategy,
  type EvaluationError,
  type EvaluationResult,
  type ReductionStep,
} from "@/shared/core/application/evaluation/type.ts";
import {ReductionVisitor} from "@/shared/core/application/evaluation/ReductionVisitor.ts";

export class Evaluator {
  private evaluationSteps: ReductionStep[] = [];

  constructor(
    private readonly maximumSteps = 500,
  ) {}

  public evaluate(
    ast: Program,
    strategy: EvaluationStrategy,
  ): EvaluationResult {

    const globals = new Map<string, Term>();

    for (const declaration of ast.globals) {
      globals.set(declaration.name, declaration.value);
    }

    this.evaluationSteps = [];

    const initialTerm = this.extractTerm(ast);
    const reductionVisitor = new ReductionVisitor(strategy, globals);

    let currentTerm = initialTerm;

    for (
      let index = 0;
      index < this.maximumSteps;
      index += 1
    ) {
      const step = reductionVisitor.reduce(currentTerm);

      if (!step) {
        const errors = this.collectErrors(currentTerm);
        return {
          result: currentTerm,
          steps: [...this.evaluationSteps],
          reachedStepLimit: false,
          strategy,
          ...(errors.length > 0 && { errors }),
        };
      }

      this.evaluationSteps.push(step);
      currentTerm = step.after;
    }

    return {
      result: currentTerm,
      steps: [...this.evaluationSteps],
      reachedStepLimit: true,
      strategy,
    };
  }

  private collectErrors(term: Term): EvaluationError[] {
    const stuck = this.findStuckTerm(term);
    if (stuck) {
      return [{message: stuck.message, stuckTermId: stuck.id}];
    }
    return [];
  }

  private findStuckTerm(term: Term): {id: string; message: string} | undefined {
    switch (term.kind) {
      case "Var":
      case "Abs":
      case "Lit":
      case "DummyAbstraction":
        return undefined;

      case "App":
        if (term.func.kind === "Lit") {
          return {id: term.id, message: "Evaluation stuck: a non-function value (literal) was applied as a function"};
        }
        return this.findStuckTerm(term.func) ?? this.findStuckTerm(term.arg);

      case "Inl":
      case "Inr":
      case "Ascribe":
      case "RecordProjection":
        return this.findStuckTerm(term.term);

      case "TupleProjection":
        return this.findStuckTerm(term.tuple);

      case "IfCondition": {
        const subterms = [
          term.condition,
          term.then,
          ...(term.elif ?? []).flatMap((b) => [b.condition, b.then]),
          ...(term.else ? [term.else] : []),
        ];
        return subterms.reduce<{id: string; message: string} | undefined>((found, t) => found ?? this.findStuckTerm(t), undefined);
      }

      case "Case":
        return (
          this.findStuckTerm(term.variable) ??
          this.findStuckTerm(term.inl.term) ??
          this.findStuckTerm(term.inr.term)
        );

      case "VariantCase":
        return term.cases.reduce<{id: string; message: string} | undefined>(
          (found, c) => found ?? this.findStuckTerm(c.body),
          this.findStuckTerm(term.variable),
        );

      case "Variant":
        return term.variants.reduce<{id: string; message: string} | undefined>((found, v) => found ?? this.findStuckTerm(v.term), undefined);

      case "Tuple":
        return term.elements.reduce<{id: string; message: string} | undefined>((found, e) => found ?? this.findStuckTerm(e), undefined);

      case "Record":
        return term.fields.reduce<{id: string; message: string} | undefined>((found, f) => found ?? this.findStuckTerm(f.term), undefined);

      case "Sequencing":
        return this.findStuckTerm(term.first) ?? this.findStuckTerm(term.second);

      case "Let":
        return this.findStuckTerm(term.value) ?? this.findStuckTerm(term.body);

      case "BinOp": {
        const found = this.findStuckTerm(term.left) ?? this.findStuckTerm(term.right);
        if (found) return found;

        const isNatLiteral = (t: Term) => t.kind === "Lit" && /^\d+$/.test(t.value);
        if (!isNatLiteral(term.left) || !isNatLiteral(term.right)) {
          return {id: term.id, message: `Evaluation stuck: operator "${term.operator}" requires both operands to be Nat literals`};
        }
        if (term.operator === "/" && (term.right as Extract<Term, {kind: "Lit"}>).value === "0") {
          return {id: term.id, message: "Evaluation stuck: division by zero"};
        }
        return undefined;
      }
    }
  }

  private extractTerm(ast: ASTNode): Term {
    switch (ast.kind) {
      case "Var":
      case "Abs":
      case "App":
      case "Lit":
      case "Inl":
      case "Inr":
      case "IfCondition":
      case "Case":
      case "VariantCase":
      case "Variant":
      case "Ascribe":
      case "TupleProjection":
      case "RecordProjection":
      case "Record":
      case "Sequencing":
      case "Tuple":
      case "DummyAbstraction":
      case "Let":
      case "BinOp":
        return ast;

      case "Program": {
        const program = ast as Program;

        if (!program.term) {
          throw new Error(
            "Program does not contain a term to evaluate",
          );
        }

        return program.term;
      }

      case "VarDecl":
      case "FunDecl":
        return ast.value;

      case "TyVar":
      case "TyArrow":
      case "TupleType":
      case "SumType":
      case "VariantType":
      case "RecordType":
      case "TyMetaVar":
        throw new Error(
          `Cannot evaluate type node ${ast.kind}`,
        );
    }
  }
}