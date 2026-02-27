import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {TermBuilderVisitor} from "@/shared/core/adapter/TermBuilderVisitor.ts";
import {
  GlobalFunctionDeclarationContext,
  type GlobalVariableDeclarationContext
} from "@/shared/core/antlr/LambdaParser.ts";
import type {GlobalDecl, Term} from "@/shared/core/domain/ast";

export class GlobalDeclVisitor extends LambdaVisitor<GlobalDecl> {

  visitGlobalVariableDeclaration = (ctx: GlobalVariableDeclarationContext ): GlobalDecl => {
    return {
      kind: "VarDecl",
      name: ctx.ID().getText(),
      value: {} as Term,
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitGlobalFunctionDeclaration = (ctx: GlobalFunctionDeclarationContext): GlobalDecl => {
    return {
      kind: "FunDecl",
      name: ctx.ID().getText(),
      value: new TermBuilderVisitor().visit(ctx.term()),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }
}
