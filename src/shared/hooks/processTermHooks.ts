import type {Program} from "@/shared/core/domain/ast";
import type {ProofTree} from "@/shared/core/domain/typecheck/ProofTree.ts";
import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {clean, pushProcessingError, setAst, setProof} from "@/shared/ui-state/termSlice.ts";

//TODO: retrieve type errors and parsing errors, to be able to display them in different sections of the UI

export function useTermHooks() {
  const {parser, typeCheckerSLTC} = useDependencies();

  const dispatch = useAppDispatch()
  const termText = useAppSelector((state) => state.term.termText);

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
    }

    try {
      if (!ast || !ast.term) return
      proof = typeCheckerSLTC.visit(ast);

      typeCheckerSLTC.getErrors().map(e => dispatch(pushProcessingError(e)));

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