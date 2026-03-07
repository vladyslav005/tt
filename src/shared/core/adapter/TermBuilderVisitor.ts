import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {
  type ApplicationContext,
  LambdaAbstractionContext, LiteralContext,
  ParenthesesContext,
  VariableContext
} from "@/shared/core/antlr/LambdaParser.ts";
import type {Abs, App, Lit, Term, TyArrow, Var} from "@/shared/core/domain/ast";

export class TermBuilderVisitor
  extends LambdaVisitor<Term> {

  visitApplication = (ctx: ApplicationContext): App => {
    return {
      kind: "App",
      id: crypto.randomUUID(),
      func: this.visit(ctx.term(0)),
      arg: this.visit(ctx.term(1))
    }
  }

  visitLambdaAbstraction = (ctx: LambdaAbstractionContext): Abs => {
    return {
      kind: "Abs",
      id: crypto.randomUUID(),
      param: ctx.ID().getText(),
      paramType: new TypeBuilderVisitor().visit(ctx.type_()),
      body: this.visit(ctx.term()),
      type: {} as TyArrow // TODO: handle this properly
    }
  }

  visitVariable = (ctx: VariableContext): Var => {
    return {
      kind: "Var",
      id: crypto.randomUUID(),

      name: ctx.ID().getText()
    }
  }

  visitParentheses = (ctx: ParenthesesContext): Term => {
    return this.visit(ctx.term())
  }

  visitLiteral = (ctx: LiteralContext): Lit => {
    return {
      kind: "Lit",
      id: crypto.randomUUID(),
      value: ctx.getText()
    }
  }
}
