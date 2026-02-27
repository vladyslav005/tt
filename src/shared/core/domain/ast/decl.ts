import type {Type} from "@/shared/core/domain/ast/type.ts";
import type {Term} from "@/shared/core/domain/ast/term.ts";
import type {Node} from "@/shared/core/domain/ast/node.ts";

export type GlobalDecl = VarDecl | FunDecl

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
