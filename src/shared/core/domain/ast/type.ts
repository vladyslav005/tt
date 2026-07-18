import type {Node} from "@/shared/core/domain/ast/node.ts";

export type Type =
  TyVar |
  TyArrow |
  TupleType |
  SumType |
  VariantType |
  TypeScheme |
  TyMetaVar;

export interface TyVar extends Node {
  kind: "TyVar"
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

export interface TypeScheme extends Node {
  kind: "TypeScheme";
  vars: string[];
  type: Type;
}

export interface TyMetaVar extends Node {
  kind: "TyMetaVar";
  name: string;
}