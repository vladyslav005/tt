import type {Node} from "@/shared/core/domain/ast/node.ts";

export type Type =
  TyIdentifier |
  TyArrow |
  TupleType |
  SumType |
  VariantType |
  RecordType |
  TyForall |
  TyMetaVar;

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