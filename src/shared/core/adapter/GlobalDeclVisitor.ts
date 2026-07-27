import LambdaVisitor from "@/shared/core/antlr/LambdaVisitor.ts";
import {TypeBuilderVisitor} from "@/shared/core/adapter/TypeBuilderVisitor.ts";
import {TermBuilderVisitor} from "@/shared/core/adapter/TermBuilderVisitor.ts";
import {KindBuilderVisitor} from "@/shared/core/adapter/KindBuilderVisitor.ts";
import {
  GlobalFunctionDeclarationContext,
  type GlobalVariableDeclarationContext,
  type TypeAliasDeclarationContext,
  type TypeConstructorDeclarationContext,
} from "@/shared/core/antlr/LambdaParser.ts";
import type {GlobalDecl, Term} from "@/shared/core/domain/ast";

export class GlobalDeclVisitor extends LambdaVisitor<GlobalDecl> {

  visitGlobalVariableDeclaration = (ctx: GlobalVariableDeclarationContext ): GlobalDecl => {
    return {
      kind: "VarDecl",
      id: crypto.randomUUID(),
      name: ctx.ID().getText(),
      value: {} as Term,
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitGlobalFunctionDeclaration = (ctx: GlobalFunctionDeclarationContext): GlobalDecl => {
    return {
      kind: "FunDecl",
      id: crypto.randomUUID(),
      name: ctx.ID().getText(),
      value: new TermBuilderVisitor().visit(ctx.term()),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitTypeAliasDeclaration = (ctx: TypeAliasDeclarationContext): GlobalDecl => {
    return {
      kind: "TypeAliasDecl",
      id: crypto.randomUUID(),
      name: ctx.ID().getText(),
      type: new TypeBuilderVisitor().visit(ctx.type_())
    }
  }

  visitTypeConstructorDeclaration = (ctx: TypeConstructorDeclarationContext): GlobalDecl => {
    return {
      kind: "TypeConstructorDecl",
      id: crypto.randomUUID(),
      name: ctx.ID().getText(),
      paramKind: new KindBuilderVisitor().visit(ctx.kind())
    }
  }
}
