import type {Type} from "@/shared/core/domain";
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {FunctionTypeContext, ParenTypeContext, type TypeIdentifierContext} from "@/shared/core/antlr/LambdaParser.ts";

export class TypeBuilderVisitor
  extends LambdaVisitor<Type> {

  visitTypeIdentifier = (ctx: TypeIdentifierContext): Type => {
    const text = ctx.getText()

    if (text === "Nat" || text === "Bool" || text === "Unit") {
      return { kind: "Const", name: text as any }
    }

    return { kind: "Var", name: text }
  }

  visitFunctionType = (ctx: FunctionTypeContext): Type => {
    return {
      kind: "Arrow",
      from: this.visit(ctx.type_(0)),
      to: this.visit(ctx.type_(1))
    }
  }

  visitParenType = (ctx: ParenTypeContext): Type => {
    return this.visit(ctx.type_())
  }
}
