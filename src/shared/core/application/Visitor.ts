import type {Abs, App, ASTNode, GlobalDecl, Program, Var} from "@/shared/core/domain/ast";

export abstract class Visitor<R> {

  visit(node: ASTNode): R {
    switch (node.kind) {

      case "Program":
        return this.visitProgram(node)

      /* ===== Terms ===== */
      case "Var":
        return this.visitVar(node)
      case "Abs":
        return this.visitAbs(node)
      case "App":
        return this.visitApp(node)

      /* ===== Declarations ===== */
      case "FunDecl":
        return this.visitTermDecl(node)
      case "VarDecl":
        return this.visitTypeDecl(node)

      default:
        throw new Error("Unknown AST node")
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: Var): R

  protected abstract visitAbs(node: Abs): R

  protected abstract visitApp(node: App): R


  /* ===== Decls ===== */
  protected abstract visitTermDecl(node: GlobalDecl): R

  protected abstract visitTypeDecl(node: GlobalDecl): R

  protected abstract visitProgram(node: Program): R
}
