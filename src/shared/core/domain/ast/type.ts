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
  ListType |
  RecursiveType;

// A base type constant (Nat, Bool, Unit) or a type variable (e.g. X in TyForall) — context decides which.
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

// Synthesized from a Record term during typechecking — no surface syntax for it.
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

// λA:K. T — a type constructor, e.g. "λA:*. A -> A" has kind * -> *. Distinct from TypeAbs (term.ts),
// which abstracts a term over a type; this abstracts a type over another type.
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

// Π x:A. B — a type depending on a term variable x:A, e.g. "Π n:Nat. Vec[n] -> Nat".
// TyArrow is this binder's non-dependent special case, kept as its own node.
export interface TyPi extends Node {
  kind: "TyPi";
  paramVar: string;
  paramType: Type;
  body: Type;
}

// F[t] — applies a dependently-kinded type constructor to a term index, e.g. "Vec[n]".
// The one place a Term is embedded inside a Type node.
export interface TyIndexApp extends Node {
  kind: "TyIndexApp";
  func: Type;
  arg: Term;
}

// =====================================================================
// =                        LISTS (Lecture 06)                         =
// =====================================================================

// List T — a dedicated type former, not derived from TyConstructorApp, with its own primitive
// nil/cons/isnil/head/tail term-level operations.
export interface ListType extends Node {
  kind: "ListType";
  elementType: Type;
}

// =====================================================================
// =                 ISO-RECURSIVE TYPES (Lecture 06)                  =
// =====================================================================

// μX.T — a self-referential type, isomorphic (not equal) to its unfolding [X↦μX.T]T;
// term-level fold/unfold witness that isomorphism explicitly.
export interface RecursiveType extends Node {
  kind: "RecursiveType";
  typeVariable: string;
  type: Type;
}