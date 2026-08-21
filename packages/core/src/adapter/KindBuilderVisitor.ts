import type {Kind} from "@/domain/ast";
import LambdaVisitor from "@/antlr/LambdaVisitor.ts";
import {
  type DependentKindArrowContext,
  type KindArrowContext,
  type ParenKindContext,
  type StarKindContext,
} from "@/antlr/LambdaParser.ts";
import {TypeBuilderVisitor} from "@/adapter/TypeBuilderVisitor.ts";
import {sourcePos} from "@/adapter/sourcePos.ts";

export class KindBuilderVisitor
  extends LambdaVisitor<Kind> {

  visitStarKind = (ctx: StarKindContext): Kind => {
    return {kind: "StarKind", id: crypto.randomUUID(), pos: sourcePos(ctx)}
  }

  visitKindArrow = (ctx: KindArrowContext): Kind => {
    return {
      kind: "KindArrow",
      id: crypto.randomUUID(),
      from: this.visit(ctx.kind(0)),
      to: this.visit(ctx.kind(1)),
      pos: sourcePos(ctx),
    }
  }

  // System λP: "Nat -> @" — a kind indexed by an ordinary type rather than
  // another kind.
  visitDependentKindArrow = (ctx: DependentKindArrowContext): Kind => {
    return {
      kind: "KindArrow",
      id: crypto.randomUUID(),
      from: new TypeBuilderVisitor().visit(ctx.type_()),
      to: this.visit(ctx.kind()),
      pos: sourcePos(ctx),
    }
  }

  visitParenKind = (ctx: ParenKindContext): Kind => {
    return this.visit(ctx.kind())
  }
}
