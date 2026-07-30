import type {Parser} from "@/shared/core/application/Parser.ts";
import type {Program, Type} from "@/shared/core/domain/ast";
import {CharStreams, CommonTokenStream} from "antlr4";
import LambdaLexer from "@/shared/core/antlr/LambdaLexer.ts";
import LambdaParser from "@/shared/core/antlr/LambdaParser.ts";
import {ProgramBuilderVisitor} from "@/shared/core/adapter/ProgramBuilderVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";

export class AntlrParserAdapter implements Parser {

  parseExpression(input: string): Program {
    const chars = CharStreams.fromString(input)
    const lexer = new LambdaLexer(chars)
    const tokens = new CommonTokenStream(lexer)
    const parser = new LambdaParser(tokens)

    const tree = parser.expression()
    return new ProgramBuilderVisitor().visit(tree)
  }
}

// Parses just a `type` expression (e.g. "Nat -> Nat"), not a whole program —
// mirrors AntlrParserAdapter.parseExpression exactly but enters the grammar
// at parser.type_() instead of parser.expression(). Used by the Proof Tree
// Builder's type-fill-in popover, where the student is writing a single
// type, not a full program.
export function parseTypeExpression(input: string): Type {
  const chars = CharStreams.fromString(input)
  const lexer = new LambdaLexer(chars)
  const tokens = new CommonTokenStream(lexer)
  const parser = new LambdaParser(tokens)

  const tree = parser.type_()
  return new TypeBuilderVisitor().visit(tree)
}
