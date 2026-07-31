import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import {GammaRegistry} from "@/shared/presentation/tex/GammaRegistry.ts";

export function buildGammaRegistry(root: ProofTree): GammaRegistry {
  const registry = new GammaRegistry();

  function walk(node: ProofTree, parent: ProofTree | null): void {
    registry.register(node.gamma, parent?.gamma ?? null);
    for (const premise of node.premises) {
      walk(premise, node);
    }
  }

  walk(root, null);
  return registry;
}
