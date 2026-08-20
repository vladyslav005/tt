import type {GlobalDecl} from "@/domain/ast";
import type {Term} from "@/domain/ast/term.ts";
import type {Node} from "@/domain/ast/node.ts";

export interface Program extends Node {
  kind: "Program"
  globals: GlobalDecl[]
  term?: Term
}
