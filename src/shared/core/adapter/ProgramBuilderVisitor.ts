import type {Program} from "@/shared/core/domain";
import type {ExprContext} from "@/shared/core/antlr/LambdaParser.ts";
import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {GlobalDeclVisitor} from "@/shared/core/adapter/GlobalDeclVisitor.ts";
import {TermBuilderVisitor} from "@/shared/core/adapter/TermBuilderVisitor.ts";


export class ProgramBuilderVisitor extends LambdaVisitor<Program> {

  visitExpr = (ctx: ExprContext): Program => {
    const globals = ctx.globalDecl_list().map(g =>
      new GlobalDeclVisitor().visit(g)
    )

    const term = ctx.term()
      ? new TermBuilderVisitor().visit(ctx.term())
      : undefined

    return { globals, term }
  }
}
