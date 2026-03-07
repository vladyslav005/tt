import type {Abs, App, ASTNode, GlobalDecl, Lit, Program, Var} from "@/shared/core/domain/ast";

export abstract class AstVisitor<R> {

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
      case "Lit":
        return this.visitLit(node)

      /* ===== Declarations ===== */
      case "FunDecl":
        return this.visitTermDecl(node)
      case "VarDecl":
        return this.visitTypeDecl(node)

      default:
        throw new Error("Unknown AST node " + node.kind)
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: Var): R

  protected abstract visitAbs(node: Abs): R

  protected abstract visitApp(node: App): R

  protected abstract visitLit(node: Lit): R


  /* ===== Decls ===== */
  protected abstract visitTermDecl(node: GlobalDecl): R

  protected abstract visitTypeDecl(node: GlobalDecl): R

  protected abstract visitProgram(node: Program): R
}
