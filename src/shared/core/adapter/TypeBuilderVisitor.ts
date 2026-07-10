import type {SumType, TupleType, TyArrow, Type, TyVar, VariantType} from "@/shared/core/domain/ast";
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {
  FunctionTypeContext,
  ParenTypeContext,
  SumTypeContext,
  TupleTypeContext,
  type TypeIdentifierContext, VariantTypeContext
} from "@/shared/core/antlr/LambdaParser.ts";

export class TypeBuilderVisitor
  extends LambdaVisitor<Type> {

  visitTypeIdentifier = (ctx: TypeIdentifierContext): TyVar => {
    const text = ctx.getText()

    if (text === "Nat" || text === "Bool" || text === "Unit") {
      return { kind: "TyVar", id: crypto.randomUUID(), name: text as any }
    }

    return { kind: "TyVar", id: crypto.randomUUID(), name: text }
  }

  visitFunctionType = (ctx: FunctionTypeContext): TyArrow => {
    return {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: this.visit(ctx.type_(0)),
      to: this.visit(ctx.type_(1))
    }
  }

  visitParenType = (ctx: ParenTypeContext): Type => {
    return this.visit(ctx.type_())
  }

  visitSumType = (ctx: SumTypeContext): SumType => {
    return {
      kind: "SumType",
      id: crypto.randomUUID(),
      right: this.visit(ctx.type_(1)),
      left: this.visit(ctx.type_(0))
    }
  }

  visitTupleType = (ctx: TupleTypeContext): TupleType => {
    return {
      kind: "TupleType",
      id: crypto.randomUUID(),
      elements: ctx.type__list().map((t) => this.visit(t))
    }
  }

  visitVariantType = (ctx: VariantTypeContext): VariantType => {
    return {
      kind: "VariantType",
      id: crypto.randomUUID(),
      variants: ctx.ID_list().map((id, index) => ({
        label: id.getText(),
        type: this.visit(ctx.type_(index))
      }))
    }
  }
}
