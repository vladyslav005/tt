import type {SumType, TupleType, TyArrow, Type, TyIdentifier, VariantType, TyForall, TyConstructorAbs, TyConstructorApp, TyPi, TyIndexApp, ListType} from "@/shared/core/domain/ast";
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {
  ForallTypeContext,
  FunctionTypeContext,
  type ListTypeContext,
  ParenTypeContext,
  SumTypeContext,
  TupleTypeContext,
  type TypeConstructorAbstractionContext,
  type TypeConstructorApplicationContext,
  type TypeIdentifierContext, VariantTypeContext,
  type PiTypeContext,
  type TypeIndexApplicationContext,
} from "@/shared/core/antlr/LambdaParser.ts";
import {KindBuilderVisitor} from "@/shared/core/adapter/KindBuilderVisitor.ts";
import {TermBuilderVisitor} from "@/shared/core/adapter/TermBuilderVisitor.ts";

export class TypeBuilderVisitor
  extends LambdaVisitor<Type> {

  visitTypeIdentifier = (ctx: TypeIdentifierContext): TyIdentifier => {
    const text = ctx.getText()

    if (text === "Nat" || text === "Bool" || text === "Unit") {
      return { kind: "TyIdentifier", id: crypto.randomUUID(), name: text as any }
    }

    return { kind: "TyIdentifier", id: crypto.randomUUID(), name: text }
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

  visitForallType = (ctx: ForallTypeContext): TyForall => {
    return {
      kind: "TyForall",
      id: crypto.randomUUID(),
      typeVariable: ctx.typeVariable().getText(),
      type: this.visit(ctx.type_())

    }
  }

  visitTypeConstructorAbstraction = (ctx: TypeConstructorAbstractionContext): TyConstructorAbs => {
    return {
      kind: "TyConstructorAbs",
      id: crypto.randomUUID(),
      typeParam: ctx.typeVariable().getText(),
      paramKind: new KindBuilderVisitor().visit(ctx.kind()),
      body: this.visit(ctx.type_()),
    }
  }

  visitTypeConstructorApplication = (ctx: TypeConstructorApplicationContext): TyConstructorApp => {
    return {
      kind: "TyConstructorApp",
      id: crypto.randomUUID(),
      func: this.visit(ctx.type_(0)),
      arg: this.visit(ctx.type_(1)),
    }
  }

  visitPiType = (ctx: PiTypeContext): TyPi => {
    return {
      kind: "TyPi",
      id: crypto.randomUUID(),
      paramVar: ctx.ID().getText(),
      paramType: this.visit(ctx.type_(0)),
      body: this.visit(ctx.type_(1)),
    }
  }

  visitTypeIndexApplication = (ctx: TypeIndexApplicationContext): TyIndexApp => {
    return {
      kind: "TyIndexApp",
      id: crypto.randomUUID(),
      func: this.visit(ctx.type_()),
      arg: new TermBuilderVisitor().visit(ctx.term()),
    }
  }

  visitListType = (ctx: ListTypeContext): ListType => {
    return {
      kind: "ListType",
      id: crypto.randomUUID(),
      elementType: this.visit(ctx.type_()),
    }
  }
}
