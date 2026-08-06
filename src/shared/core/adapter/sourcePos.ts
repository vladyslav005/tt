import type {ParserRuleContext} from "antlr4";
import type {SourcePosition} from "@/shared/core/domain/ast";

export function sourcePos(ctx: ParserRuleContext): SourcePosition {
  return {
    line: ctx.start.line,
    column: ctx.start.column,
    length: ctx.getText().length,
  };
}
