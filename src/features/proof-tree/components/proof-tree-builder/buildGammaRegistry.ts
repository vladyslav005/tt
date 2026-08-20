import type {ProofTree} from "@vladyslav005/tt-core";
import {GammaRegistry} from "@vladyslav005/tt-core";

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
