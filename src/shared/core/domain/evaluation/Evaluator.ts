import type {
  ASTNode,
  Program,
  Term,
} from "@/shared/core/domain/ast";

import {
  EvaluationStrategy,
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
    ast: ASTNode,
    strategy: EvaluationStrategy,
  ): EvaluationResult {
    this.evaluationSteps = [];

    const initialTerm = this.extractTerm(ast);
    const reductionVisitor =
      new ReductionVisitor();

    let currentTerm = initialTerm;

    for (
      let index = 0;
      index < this.maximumSteps;
      index += 1
    ) {
      const step = reductionVisitor.reduce(currentTerm, strategy);

      if (!step) {
        return {
          result: currentTerm,
          steps: [...this.evaluationSteps],
          reachedStepLimit: false,
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