import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Type} from "@/shared/core/domain/ast/type.ts";

// Classifies types the way types classify terms: K ::= * | K → K | T → K
// (the T → K case, from System λP, indexes a kind by a term via an ordinary Type).
export type Kind =
  StarKind |
  KindArrow;

export interface StarKind extends Node {
  kind: "StarKind"
}

export interface KindArrow extends Node {
  kind: "KindArrow"
  from: Kind | Type
  to: Kind
}

export function isKind(x: Kind | Type): x is Kind {
  return x.kind === "StarKind" || x.kind === "KindArrow";
}
