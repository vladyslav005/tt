import type {
  Abs,
  App,
  Ascribe,
  ASTNode,
  BinOp,
  Case,
  DummyAbstraction,
  GlobalDecl,
  IfCondition,
  Inl,
  Inr, Let,
  Lit,
  Program,
  Record,
  RecordProjection,
  Sequencing,
  Tuple,
  TupleProjection,
  Type,
  Var,
  Variant,
  VariantCase,
} from "@/shared/core/domain/ast";

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
      case "VariantCase":
        return this.visitVariantCase(node)
      case "Inl":
        return this.visitInl(node)
      case "Inr":
        return this.visitInr(node)
      case "IfCondition":
        return this.visitIfCondition(node)
      case "Case":
        return this.visitCase(node)
      case "Variant":
        return this.visitVariant(node)
      case "Ascribe":
        return this.visitAscribe(node)
      case "TupleProjection":
        return this.visitTupleProjection(node)
      case "RecordProjection":
        return this.visitRecordProjection(node)
      case "Record":
        return this.visitRecord(node)
      case "Sequencing":
        return this.visitSequencing(node)
      case "Tuple":
        return this.visitTuple(node)
      case "DummyAbstraction":
        return this.visitDummyAbstraction(node)
      case "BinOp":
        return this.visitBinOp(node)

      /* ===== Declarations ===== */
      case "FunDecl":
        return this.visitTermDecl(node)
      case "VarDecl":
        return this.visitTypeDecl(node)

      /* ===== Let ===== */
      case "Let":
        return this.visitLet(node)

      /* ===== Types ===== */
      case "TyVar":
      case "TyArrow":
      case "TupleType":
      case "SumType":
      case "VariantType":
      case "RecordType":
        return this.visitType(node)

      default:
        throw new Error("Unknown AST node " + (node as any).kind)
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: Var): R

  protected abstract visitAbs(node: Abs): R

  protected abstract visitApp(node: App): R

  protected abstract visitLit(node: Lit): R

  protected abstract visitVariantCase(node: VariantCase): R

  protected abstract visitInl(node: Inl): R

  protected abstract visitInr(node: Inr): R

  protected abstract visitIfCondition(node: IfCondition): R

  protected abstract visitCase(node: Case): R

  protected abstract visitVariant(node: Variant): R

  protected abstract visitAscribe(node: Ascribe): R

  protected abstract visitRecordProjection(node: RecordProjection): R

  protected abstract visitRecord(node: Record): R

  protected abstract visitTuple(node: Tuple): R

  protected abstract visitTupleProjection(node: TupleProjection): R

  protected abstract visitSequencing(node: Sequencing): R

  protected abstract visitDummyAbstraction(node: DummyAbstraction): R

  protected abstract visitBinOp(node: BinOp): R

  /* ===== Let ===== */
  protected abstract visitLet(node: Let): R

  /* ===== Decls ===== */
  protected abstract visitTermDecl(node: GlobalDecl): R

  protected abstract visitTypeDecl(node: GlobalDecl): R

  protected abstract visitProgram(node: Program): R

  /* ===== Types ===== */
  protected abstract visitType(node: Type): R

}
