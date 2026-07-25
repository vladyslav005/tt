import type {Node} from "@/shared/core/domain/ast/node.ts";

// System λω̲: classifies types the way types classify terms. K ::= * | K → K.
// No AST node for parenthesized kinds — the adapter unwraps grouping
// parens directly, matching how ParenType is handled.
export type Kind =
  StarKind |
  KindArrow;

export interface StarKind extends Node {
  kind: "StarKind"
}

export interface KindArrow extends Node {
  kind: "KindArrow"
  from: Kind
  to: Kind
}
