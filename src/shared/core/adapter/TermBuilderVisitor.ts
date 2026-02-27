import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {
  type ApplicationContext,
  LambdaAbstractionContext, LiteralContext,
  ParenthesesContext,
  VariableContext
} from "@/shared/core/antlr/LambdaParser.ts";
import type {Abs, App, Lit, Term, Var} from "@/shared/core/domain/ast";

export class TermBuilderVisitor
  extends LambdaVisitor<Term> {

  visitApplication = (ctx: ApplicationContext): App => {
    return {
      kind: "App",
      func: this.visit(ctx.term(0)),
      arg: this.visit(ctx.term(1))
    }
  }

  visitLambdaAbstraction = (ctx: LambdaAbstractionContext): Abs => {
    return {
      kind: "Abs",
      param: ctx.ID().getText(),
      paramType: new TypeBuilderVisitor().visit(ctx.type_()),
      body: this.visit(ctx.term())
    }
  }

  visitVariable = (ctx: VariableContext): Var => {
    return {
      kind: "Var",
      name: ctx.ID().getText()
    }
  }

  visitParentheses = (ctx: ParenthesesContext): Term => {
    return this.visit(ctx.term())
  }

  visitLiteral = (ctx: LiteralContext): Lit => {
    return {
      kind: "Lit",
      value: ctx.getText()
    }
  }
}
