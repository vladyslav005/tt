import type {Node} from "@/shared/core/domain/ast/node.ts";

export type Type = TyVar | TyArrow

export interface TyVar extends Node {
  kind: "TyVar"
  name: string
}

export interface TyArrow extends Node {
  kind: "TyArrow"
  from: Type
  to: Type
}
