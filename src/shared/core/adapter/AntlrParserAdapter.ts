import type {Parser} from "@/shared/core/application/Parser.ts";
import type {Program} from "@/shared/core/domain/ast";
import {CharStreams, CommonTokenStream} from "antlr4";
import LambdaLexer from "@/shared/core/antlr/LambdaLexer.ts";
import LambdaParser from "@/shared/core/antlr/LambdaParser.ts";
import {ProgramBuilderVisitor} from "@/shared/core/adapter/ProgramBuilderVisitor.ts";

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
