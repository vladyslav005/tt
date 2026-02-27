import type {GlobalDecl, Type} from "@/shared/core/domain/ast";
import type {Term} from "@/shared/core/domain/ast/term.ts";
import type {Program} from "@/shared/core/domain/ast/program.ts";

export * from "./node"
export * from "./program"
export * from "./decl"
export * from "./term"
export * from "./type"

export type ASTNode =
  | Program
  | GlobalDecl
  | Term
  | Type
