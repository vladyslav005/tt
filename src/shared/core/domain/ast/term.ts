import type {Node} from "@/shared/core/domain/ast/node.ts";
import type {Type} from "@/shared/core/domain/ast/type.ts";

export type Term = Var | Abs | App | Lit

export interface Var extends Node {
  kind: "Var"
  name: string
}

export interface Abs extends Node {
  kind: "Abs"
  param: string
  paramType: Type
  body: Term
}

export interface App extends Node {
  kind: "App"
  func: Term
  arg: Term
}

export interface Lit extends Node {
  kind: "Lit"
  value: string
}