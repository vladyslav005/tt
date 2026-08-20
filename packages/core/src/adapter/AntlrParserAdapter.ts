import type {Parser} from "@/application/Parser.ts";
import type {Program, Type} from "@/domain/ast";
import {CharStreams, CommonTokenStream} from "antlr4";
import LambdaLexer from "@/antlr/LambdaLexer.ts";
import LambdaParser from "@/antlr/LambdaParser.ts";
import {ProgramBuilderVisitor} from "@/adapter/ProgramBuilderVisitor.ts";
import {TypeBuilderVisitor} from "@/adapter/TypeBuilderVisitor.ts";
import {CollectingErrorListener, ParseSyntaxError} from "@/adapter/SyntaxErrorListener.ts";

export class AntlrParserAdapter implements Parser {

  parseExpression(input: string): Program {
    const chars = CharStreams.fromString(input)
    const lexer = new LambdaLexer(chars)
    const tokens = new CommonTokenStream(lexer)
    const parser = new LambdaParser(tokens)

    const errorListener = new CollectingErrorListener();
    lexer.removeErrorListeners();
    lexer.addErrorListener(errorListener);
    parser.removeErrorListeners();
    parser.addErrorListener(errorListener);

    const tree = parser.expression()
    if (errorListener.errors.length > 0) {
      throw new ParseSyntaxError(errorListener.errors);
    }
    return new ProgramBuilderVisitor().visit(tree)
  }
}

// Parses a standalone `type` expression, e.g. for the Proof Tree Builder's type-fill-in popover.
export function parseTypeExpression(input: string): Type {
  const chars = CharStreams.fromString(input)
  const lexer = new LambdaLexer(chars)
  const tokens = new CommonTokenStream(lexer)
  const parser = new LambdaParser(tokens)

  const tree = parser.type_()
  return new TypeBuilderVisitor().visit(tree)
}
