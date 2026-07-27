import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Type} from "@/shared/core/domain/ast/type.ts";

// System λω̲: classifies types the way types classify terms. K ::= * | K → K.
// No AST node for parenthesized kinds — the adapter unwraps grouping
// parens directly, matching how ParenType is handled.
//
// System λP widens this: K ::= * | K → K | T → K — a kind can also be
// indexed by an ordinary Type (e.g. "Nat -> *"), not just by another Kind,
// classifying a type constructor that takes a *term* rather than a type.
// KindArrow.from carries either shape; use isKind to discriminate.
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
