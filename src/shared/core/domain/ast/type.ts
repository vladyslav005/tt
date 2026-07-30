import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Kind} from "@/shared/core/domain/ast/kind.ts";
import type {Term} from "@/shared/core/domain/ast/term.ts";

export type Type =
  TyIdentifier |
  TyArrow |
  TupleType |
  SumType |
  VariantType |
  RecordType |
  TyForall |
  TyMetaVar |
  TyConstructorAbs |
  TyConstructorApp |
  TyPi |
  TyIndexApp |
  ListType;

// A nullary type referred to by name — either a base type constant (Nat,
// Bool, Unit) or a bound/free type variable (e.g. X in a TyForall). Which
// one it is depends on context, not on this node.
export interface TyIdentifier extends Node {
  kind: "TyIdentifier"
  name: string
}

export interface TyArrow extends Node {
  kind: "TyArrow"
  from: Type
  to: Type
}

export interface TupleType extends Node {
  kind: "TupleType"
  elements: Type[]
}

export interface SumType extends Node {
  kind: "SumType"
  right: Type
  left: Type
}

export interface VariantType extends Node {
  kind: "VariantType"
  variants: {
    label: string
    type: Type
  }[]
}

// Synthesized from a Record term during typechecking — there is no surface
// syntax for it, since record types are always inferred from field literals.
export interface RecordType extends Node {
  kind: "RecordType"
  fields: {
    label: string
    type: Type
  }[]
}


export interface TyMetaVar extends Node {
  kind: "TyMetaVar";
  name: string;
}

export interface TyForall extends Node {
  kind: "TyForall";
  typeVariable: string;
  type: Type;
}

// =====================================================================
// =                        SYSTEM λω̲                                  =
// =====================================================================

// λA:K. T — a type constructor, e.g. "λA:*. A -> A" has kind * -> *.
// Distinct from TypeAbs (term.ts): that's a term abstracted over a type
// (System F, Λ, produces a TyForall when checked); this is a type itself
// abstracted over another type, classified by a Kind rather than a Type.
export interface TyConstructorAbs extends Node {
  kind: "TyConstructorAbs";
  typeParam: string;
  paramKind: Kind;
  body: Type;
}

// T1 T2 — applies a type constructor to a type argument, e.g. "List Nat".
export interface TyConstructorApp extends Node {
  kind: "TyConstructorApp";
  func: Type;
  arg: Type;
}

// =====================================================================
// =                        SYSTEM λP                                  =
// =====================================================================

// Π x:A. B — a type that depends on a *term* variable x:A, e.g.
// "Π n:Nat. Vec[n] -> Nat". "A -> B" (TyArrow) is this binder's
// non-dependent special case, when x doesn't occur free in B — kept as its
// own node rather than folding TyArrow into TyPi, matching how TyForall
// coexists with ordinary types.
export interface TyPi extends Node {
  kind: "TyPi";
  paramVar: string;
  paramType: Type;
  body: Type;
}

// F[t] — applies a dependently-kinded type constructor to a *term* index,
// e.g. "Vec[n]" or "Vec[3]". The one place a Term is embedded inside a
// Type node; distinct from TyConstructorApp, which only ever applies a
// type constructor to another type.
export interface TyIndexApp extends Node {
  kind: "TyIndexApp";
  func: Type;
  arg: Term;
}

// =====================================================================
// =                        LISTS (Lecture 06)                         =
// =====================================================================

// List T — a dedicated type former, not derived from TyConstructorApp:
// this predates System λω̲ pedagogically and has its own primitive
// nil/cons/isnil/head/tail term-level operations with no dependency on the
// type-constructor/kind system.
export interface ListType extends Node {
  kind: "ListType";
  elementType: Type;
}