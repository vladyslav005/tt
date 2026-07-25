import type {Kind} from "@/shared/core/domain/ast";
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {
  type KindArrowContext,
  type ParenKindContext,
} from "@/shared/core/antlr/LambdaParser.ts";

export class KindBuilderVisitor
  extends LambdaVisitor<Kind> {

  visitStarKind = (): Kind => {
    return {kind: "StarKind", id: crypto.randomUUID()}
  }

  visitKindArrow = (ctx: KindArrowContext): Kind => {
    return {
      kind: "KindArrow",
      id: crypto.randomUUID(),
      from: this.visit(ctx.kind(0)),
      to: this.visit(ctx.kind(1)),
    }
  }

  visitParenKind = (ctx: ParenKindContext): Kind => {
    return this.visit(ctx.kind())
  }
}
