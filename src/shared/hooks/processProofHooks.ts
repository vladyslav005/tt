import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";


export function useProofHooks() {
  const {texMapper} = useDependencies();
  const typeAliases = useAppSelector((state) => state.term.typeAliases);

  function toTexTree(proof: ProofTree): TexTree {
    texMapper.setTypeAliases(typeAliases);
    return texMapper.visit(proof);
  }

  return {toTexTree}
}