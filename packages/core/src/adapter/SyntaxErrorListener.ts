import {ErrorListener} from "antlr4";
import type {SourcePosition} from "@/domain/ast";

export interface SyntaxErrorInfo extends SourcePosition {
  message: string;
}

// Thrown instead of letting a malformed parse tree reach the visitor (which fails with a
// confusing "Cannot read properties of null" deep inside ProgramBuilderVisitor) — carries real
// positions so the editor can underline the offending token instead of just showing a message.
export class ParseSyntaxError extends Error {
  constructor(public readonly errors: SyntaxErrorInfo[]) {
    super(errors.map((e) => e.message).join("; "));
    this.name = "ParseSyntaxError";
  }
}

// Attached to both the lexer (offendingSymbol: number) and the parser (offendingSymbol: Token) —
// `any` lets one listener satisfy both ErrorListener<TSymbol> instantiations.
export class CollectingErrorListener extends ErrorListener<any> {
  readonly errors: SyntaxErrorInfo[] = [];

  syntaxError(
    _recognizer: any,
    offendingSymbol: any,
    line: number,
    column: number,
    msg: string,
  ): void {
    this.errors.push({
      line,
      column,
      length: offendingSymbol?.text?.length || 1,
      message: msg,
    });
  }
}
