import {useDependencies} from "@/app/providers/di/DependencyProvider.tsx";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {NonStlcProofError} from "@/shared/presentation/tex/LogicMapper.ts";


export function useProofHooks() {
  const {texMapper, logicMapper} = useDependencies();
  const typeAliases = useAppSelector((state) => state.term.typeAliases);

  function toTexTree(proof: ProofTree): TexTree {
    texMapper.setTypeAliases(typeAliases);
    return texMapper.visit(proof);
  }

  // Returns null (rather than a mismatched tree) when `proof` uses rules outside plain STLC.
  function toLogicTree(proof: ProofTree): TexTree | null {
    logicMapper.setTypeAliases(typeAliases);
    try {
      return logicMapper.visit(proof);
    } catch (error) {
      if (error instanceof NonStlcProofError) return null;
      throw error;
    }
  }

  return {toTexTree, toLogicTree}
}