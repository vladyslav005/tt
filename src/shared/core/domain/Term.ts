import type {Type} from "@/shared/core/domain/Type.ts";

export type Term =
  | Var
  | Abs
  | App
  | Lit

export interface Program {
  globals: GlobalDecl[]
  term?: Term
}

export interface GlobalDecl {
  kind: "GlobalVariableDeclaration" | "GlobalFunctionDeclaration"
  name: string
  type?: Type
  value: Term
}

export interface Var {
  kind: "Var"
  name: string
}

export interface Abs {
  kind: "Abs"
  param: string
  paramType?: Type
  body: Term
}

export interface App {
  kind: "App"
  func: Term
  arg: Term
}

export interface Lit {
  kind: "Lit"
  value: string
}

