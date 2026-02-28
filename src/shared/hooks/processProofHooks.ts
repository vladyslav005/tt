import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import type {ProofTree} from "@/shared/core/domain/typecheck/ProofTree.ts";
import type {TexTree} from "@/shared/presentation/texTree.ts";


export function useProofHooks() {
  const {texMapper} = useDependencies();

  function toTexTree(proof: ProofTree): TexTree {
    return texMapper.visit(proof);
  }

  return {toTexTree}
}