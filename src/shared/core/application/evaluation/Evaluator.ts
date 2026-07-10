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
    const stuckTermId = this.findStuckTermId(term);
    if (stuckTermId) {
      return [{
        message: "Evaluation stuck: a non-function value (literal) was applied as a function",
        stuckTermId,
      }];
    }
    return [];
  }

  private findStuckTermId(term: Term): string | undefined {
    switch (term.kind) {
      case "Var":
      case "Abs":
      case "Lit":
      case "DummyAbstraction":
        return undefined;

      case "App":
        if (term.func.kind === "Lit") {
          return term.id;
        }
        return this.findStuckTermId(term.func) ?? this.findStuckTermId(term.arg);

      case "Inl":
      case "Inr":
      case "Ascribe":
      case "RecordProjection":
        return this.findStuckTermId(term.term);

      case "TupleProjection":
        return this.findStuckTermId(term.tuple);

      case "IfCondition": {
        const subterms = [
          term.condition,
          term.then,
          ...(term.elif ?? []).flatMap((b) => [b.condition, b.then]),
          ...(term.else ? [term.else] : []),
        ];
        return subterms.reduce<string | undefined>((found, t) => found ?? this.findStuckTermId(t), undefined);
      }

      case "Case":
        return (
          this.findStuckTermId(term.variable) ??
          this.findStuckTermId(term.inl.term) ??
          this.findStuckTermId(term.inr.term)
        );

      case "VariantCase":
        return term.cases.reduce<string | undefined>(
          (found, c) => found ?? this.findStuckTermId(c.body),
          this.findStuckTermId(term.variable),
        );

      case "Variant":
        return term.variants.reduce<string | undefined>((found, v) => found ?? this.findStuckTermId(v.term), undefined);

      case "Tuple":
        return term.elements.reduce<string | undefined>((found, e) => found ?? this.findStuckTermId(e), undefined);

      case "Record":
        return term.fields.reduce<string | undefined>((found, f) => found ?? this.findStuckTermId(f.term), undefined);

      case "Sequencing":
        return this.findStuckTermId(term.first) ?? this.findStuckTermId(term.second);
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
        throw new Error(
          `Cannot evaluate type node ${ast.kind}`,
        );
    }
  }
}