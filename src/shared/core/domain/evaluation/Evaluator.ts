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
} from "@/shared/core/domain/evaluation/type.ts";
import {ReductionVisitor} from "@/shared/core/domain/evaluation/ReductionVisitor.ts";

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
        return undefined;
      case "App":
        if (term.func.kind === "Lit") {
          return term.id;
        }
        return this.findStuckTermId(term.func) ?? this.findStuckTermId(term.arg);
    }
  }

  private extractTerm(ast: ASTNode): Term {
    switch (ast.kind) {
      case "Var":
      case "Abs":
      case "App":
      case "Lit":
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
        throw new Error(
          `Cannot evaluate type node ${ast.kind}`,
        );
    }
  }
}