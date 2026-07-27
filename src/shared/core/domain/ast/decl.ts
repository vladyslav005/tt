import type {Type} from "@/shared/core/domain/ast/type.ts";
import type {Term} from "@/shared/core/domain/ast/term.ts";
import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Kind} from "@/shared/core/domain/ast/kind.ts";

export type GlobalDecl = VarDecl | FunDecl | TypeAliasDecl | TypeConstructorDecl

export interface VarDecl extends Node {
  kind: "VarDecl"
  name: string
  type: Type
  value: Term
}

export interface FunDecl extends Node {
  kind: "FunDecl"
  name: string
  value: Term
  type: Type

}

// typedef X = T; — a transparent synonym: every occurrence of X in a later
// type annotation is expanded to T during typechecking (see
// SLTLCTypeChecker.expandAliases). Has no runtime value — the evaluator
// skips these entirely.
export interface TypeAliasDecl extends Node {
  kind: "TypeAliasDecl"
  name: string
  type: Type
}

// typedef X : K; — declares X as an opaque, dependently-kinded type
// constructor (e.g. "Vec : Nat -> *") with no definition — unlike
// TypeAliasDecl, there is nothing to expand X to; it's a free family whose
// only observable property is its kind. System λP.
export interface TypeConstructorDecl extends Node {
  kind: "TypeConstructorDecl"
  name: string
  paramKind: Kind
}
