import type {ParserRuleContext} from "antlr4";
import type {SourcePosition} from "@/shared/core/domain/ast";

export function sourcePos(ctx: ParserRuleContext): SourcePosition {
  // ctx.getText() only concatenates default-channel tokens with no separators, so it
  // undercounts whenever the span contains whitespace between tokens (e.g. "f x",
  // "compose identity") — use the raw start/stop character offsets instead, which
  // cover the whole span as it actually appears in the source.
  const stop = ctx.stop ?? ctx.start;
  return {
    line: ctx.start.line,
    column: ctx.start.column,
    length: stop.stop - ctx.start.start + 1,
    endLine: stop.line,
    endColumn: stop.column + stop.text.length,
  };
}
