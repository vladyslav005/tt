// infrastructure/antlr/TermBuilderVisitor.ts
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import type {Term} from "@/shared/core/domain";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {
  type ApplicationContext,
  LambdaAbstractionContext, LiteralContext,
  ParenthesesContext,
  VariableContext
} from "@/shared/core/antlr/LambdaParser.ts";

export class TermBuilderVisitor
  extends LambdaVisitor<Term> {

  visitApplication = (ctx: ApplicationContext): Term => {
    return {
      kind: "App",
      func: this.visit(ctx.term(0)),
      arg: this.visit(ctx.term(1))
    }
  }

  visitLambdaAbstraction = (ctx: LambdaAbstractionContext): Term => {
    return {
      kind: "Abs",
      param: ctx.ID().getText(),
      paramType: ctx.type_()
        ? new TypeBuilderVisitor().visit(ctx.type_())
        : undefined,
      body: this.visit(ctx.term())
    }
  }

  visitVariable = (ctx: VariableContext): Term => {
    return {
      kind: "Var",
      name: ctx.ID().getText()
    }
  }

  visitParentheses = (ctx: ParenthesesContext): Term => {
    return this.visit(ctx.term())
  }

  visitLiteral = (ctx: LiteralContext): Term => {
    return {
      kind: "Lit",
      value: ctx.getText()
    }
  }
}
