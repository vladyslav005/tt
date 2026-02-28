import type {Program} from "@/shared/core/domain/ast";
import type {ProofTree} from "@/shared/core/domain/typecheck/ProofTree.ts";
import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {cleanErrors, pushProcessingError, setAst, setProof} from "@/shared/ui-state/termSlice.ts";

//TODO: retrieve type errors and parsing errors, to be able to display them in different sections of the UI

export function useTermHooks() {
  const { parser, typeCheckerSLTC } = useDependencies();
  const dispatch = useAppDispatch()


  function parseTerm(term: string): Program {
      return parser.parseExpression(term)
  }

  function typecheckTerm(ast: Program): ProofTree {
      return typeCheckerSLTC.visit(ast);
  }

  function parseAndTypeCheck(term: string): void {
    let ast: Program | undefined = undefined
    let proof: ProofTree | undefined = undefined

    dispatch(cleanErrors())

    try {
      ast = parser.parseExpression(term);

      dispatch(setAst(ast))

    } catch (error) {
      console.error("Error parsing term:", error);
      dispatch(pushProcessingError(new Error(`${(error as Error).message}`)))
      dispatch(setAst(undefined))
      dispatch(setProof(undefined))
    }

    try {
      if (!ast) return
      proof = typeCheckerSLTC.visit(ast);

      dispatch(setProof(proof));

    } catch (error) {
      console.error("Error typechecking term:", error);
      dispatch(pushProcessingError(new Error(`${(error as Error).message}`)))
      dispatch(setProof(undefined));
    }
  }

  return {
    parseTerm,
    typecheckTerm,
    parseAndTypeCheck
  }
}