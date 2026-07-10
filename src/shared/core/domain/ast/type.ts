import type {Node} from "@/shared/core/domain/ast/node.ts";

export type Type = TyVar | TyArrow | TupleType | SumType | VariantType

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
