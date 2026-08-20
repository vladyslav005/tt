import {useCallback, useState} from "react";
import type {Type} from "@vladyslav005/tt-core";
import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import {TexMapper} from "@vladyslav005/tt-core";
import {typeToString} from "@vladyslav005/tt-core";
import {DEFAULT_TYPE_THEORY_CONFIG} from "@vladyslav005/tt-core";

export interface MiniWorkspaceResult {
  type: Type;
  typeTex: string;
  typeText: string;
}

// Redux-free alternative to useTermHooks(), for docs widgets with local rather than global state.
export function useMiniWorkspace(initialTerm: string) {
  const {parser, typeCheckerSLTC} = useDependencies();
  const [termText, setTermText] = useState(initialTerm);
  const [result, setResult] = useState<MiniWorkspaceResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    setChecked(true);
    try {
      const ast = parser.parseExpression(termText);
      if (!ast.term) {
        setResult(undefined);
        setError("Write a term to check, not just declarations.");
        return;
      }

      typeCheckerSLTC.setTheories(DEFAULT_TYPE_THEORY_CONFIG);
      const proof = typeCheckerSLTC.check(ast);
      const typeErrors = typeCheckerSLTC.getErrors();

      if (typeErrors.length > 0 || proof.error) {
        setResult(undefined);
        setError(typeErrors[0]?.message ?? proof.error ?? "Type error");
        return;
      }

      setError(undefined);
      setResult({
        type: proof.type,
        typeTex: TexMapper.typeToTex(proof.type),
        typeText: typeToString(proof.type),
      });
    } catch (e) {
      setResult(undefined);
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [termText, parser, typeCheckerSLTC]);

  const reset = useCallback(() => {
    setTermText(initialTerm);
    setResult(undefined);
    setError(undefined);
    setChecked(false);
  }, [initialTerm]);

  return {termText, setTermText, check, reset, result, error, checked};
}
