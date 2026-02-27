import type {GlobalDecl} from "@/shared/core/domain/ast";
import type {Term} from "@/shared/core/domain/ast/term.ts";
import type {Node} from "@/shared/core/domain/ast/node.ts";

export interface Program extends Node {
  kind: "Program"
  globals: GlobalDecl[]
  term?: Term
}
