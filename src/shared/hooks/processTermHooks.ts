import type {Program} from "@/shared/core/domain/ast";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {clean, pushProcessingError, setAst, setEvaluation, setProof} from "@/shared/ui-state/termSlice.ts";
import type {EvaluationStrategy} from "@/shared/core/application/evaluation/type.ts";

//TODO: retrieve type errors and parsing errors, to be able to display them in different sections of the UI

export function useTermHooks() {
  const {
    parser,
    typeCheckerSLTC,
    evaluator,
  } = useDependencies();

  const dispatch = useAppDispatch()
  const termText = useAppSelector((state) => state.term.termText);
  const ast = useAppSelector((state) => state.term.ast);

  function parseTerm(term: string): Program {
    return parser.parseExpression(term)
  }

  function typecheckTerm(ast: Program): ProofTree {
    return typeCheckerSLTC.visit(ast);
  }

  function parseAndTypeCheck(termOverride?: string): void {
    const term = termOverride ?? termText;
    if (!term) return

    let ast: Program | undefined = undefined
    let proof: ProofTree | undefined = undefined

    dispatch(clean())

    try {
      ast = parser.parseExpression(term);

      dispatch(setAst(ast))

    } catch (error) {
      console.error("Error parsing term:", error);
      dispatch(pushProcessingError(new Error(`${(error as Error).message}`)))
      dispatch(setAst(undefined))
      dispatch(setProof(undefined))
      return;
    }

    try {
      if (!ast) return;

      if (!ast.term) {
        dispatch(pushProcessingError(new Error("No main expression — write a term after the declarations")));
        return;
      }

      proof = typeCheckerSLTC.visit(ast);

      typeCheckerSLTC.getErrors().forEach(e => dispatch(pushProcessingError(e)));

      dispatch(setProof(proof));

    } catch (error) {
      console.error("Error typechecking term:", error);
      dispatch(pushProcessingError(new Error(`${(error as Error).message}`)));
      dispatch(setProof(undefined));
    }
  }


  function evaluateTerm(strategy: EvaluationStrategy) {
    if (!ast) return;

    try {
      const evaluationResult = evaluator.evaluate(ast, strategy);
      dispatch(setEvaluation(evaluationResult));

      evaluationResult.errors?.forEach((e) =>
        dispatch(pushProcessingError(new Error(e.message))),
      );

      if (evaluationResult.reachedStepLimit) {
        dispatch(
          pushProcessingError(
            new Error("Evaluation reached the step limit — expression may not be fully reduced"),
          ),
        );
      }
    } catch (error) {
      console.error("Error evaluating term:", error);
      dispatch(pushProcessingError(new Error(`${(error as Error).message}`)));
    }
  }

  return {
    parseTerm,
    typecheckTerm,
    evaluateTerm,
    parseAndTypeCheck
  }
}