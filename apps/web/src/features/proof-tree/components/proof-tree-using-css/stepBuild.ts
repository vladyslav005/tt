import type {TexTree} from "@vladyslav005/tt-core";

// Pre-order traversal: the goal judgement comes first, then each premise needed
// to justify it, recursively — mirroring how a derivation is built by hand,
// starting from the conclusion and working up to the axioms.
export function collectBuildOrder(node: TexTree, out: TexTree[] = []): TexTree[] {
  out.push(node);
  for (const child of node.children ?? []) {
    collectBuildOrder(child, out);
  }
  return out;
}
