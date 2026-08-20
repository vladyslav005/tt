import type {GlobalDecl, Type} from "@/domain/ast";
import type {Term} from "@/domain/ast/term.ts";
import type {Program} from "@/domain/ast/program.ts";
import type {Kind} from "@/domain/ast/kind.ts";

export * from "./node"
export * from "./program"
export * from "./decl"
export * from "./term"
export * from "./type"
export * from "./kind"

export type ASTNode =
  | Program
  | GlobalDecl
  | Term
  | Type
  | Kind
