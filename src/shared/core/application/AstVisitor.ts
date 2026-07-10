import type {
  Abs,
  App,
  ASTNode,
  GlobalDecl,
  Lit,
  Program,
  Var,
  Type,
  Inl,
  Inr,
  IfCondition, Case, Ascribe, RecordProjection, Tuple
} from "@/shared/core/domain/ast";
import type {Variant} from "framer-motion";

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

      /* ===== Types ===== */
      case "TyVar":
      case "TyArrow":
        return this.visitType(node as any)

      default:
        throw new Error("Unknown AST node " + (node as any).kind)
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: Var): R

  protected abstract visitAbs(node: Abs): R

  protected abstract visitApp(node: App): R

  protected abstract visitLit(node: Lit): R

  protected abstract visitVariantCase(node: Variant): R

  protected abstract visitInl(node: Inl): R

  protected abstract visitInr(node: Inr): R

  protected abstract visitIfCondition(node: IfCondition): R

  protected abstract visitCase(node: Case): R

  protected abstract visitVariant(node: Variant): R

  protected abstract visitAscribe(node: Ascribe): R

  protected abstract visitRecordProjection(node: RecordProjection): R

  protected abstract visitRecord(node: RecordProjection): R

  protected abstract visitTuple(node: Tuple): R

  protected abstract visitTupleProjection(node: Tuple): R

  protected abstract visitSequencing(node: Tuple): R

  protected abstract visitDummyAbstraction(node: Tuple): R


  /* ===== Decls ===== */
  protected abstract visitTermDecl(node: GlobalDecl): R

  protected abstract visitTypeDecl(node: GlobalDecl): R

  protected abstract visitProgram(node: Program): R

  /* ===== Types ===== */
  protected abstract visitType(node: Type): R
}
