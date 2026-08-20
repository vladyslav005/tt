import type {Program} from "@/domain/ast";
import type {ExprContext} from "@/antlr/LambdaParser.ts";
import LambdaVisitor from "@/antlr/LambdaVisitor.ts";
import {GlobalDeclVisitor} from "@/adapter/GlobalDeclVisitor.ts";
import {TermBuilderVisitor} from "@/adapter/TermBuilderVisitor.ts";


export class ProgramBuilderVisitor extends LambdaVisitor<Program> {

  visitExpr = (ctx: ExprContext): Program => {
    const globals = ctx.globalDecl_list().map(g =>
      new GlobalDeclVisitor().visit(g)
    )

    const term = ctx.term()
      ? new TermBuilderVisitor().visit(ctx.term())
      : undefined

    return {id: crypto.randomUUID(), kind: "Program", globals, term }
  }
}
