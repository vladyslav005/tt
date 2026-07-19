import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";

export abstract class ProofTreeVisitor<R> {

  visit(node: ProofTree): R {
    switch (node.rule) {


      /* ===== Terms ===== */
      case "Var":
        return this.visitVar(node)
      case "Abs":
        return this.visitAbs(node)
      case "App":
        return this.visitApp(node)
      case "Lit":
        return this.visitLit(node)
      case "If":
        return this.visitIfCondition(node)
      case "Inl":
        return this.visitInl(node)
      case "Inr":
        return this.visitInr(node)
      case "Case":
        return this.visitCase(node)
      case "VariantCase":
        return this.visitVariantCase(node)
      case "Variant":
        return this.visitVariant(node)
      case "Ascribe":
        return this.visitAscribe(node)
      case "Tuple":
        return this.visitTuple(node)
      case "TupleProjection":
        return this.visitTupleProjection(node)
      case "Record":
        return this.visitRecord(node)
      case "RecordProjection":
        return this.visitRecordProjection(node)
      case "Sequencing":
        return this.visitSequencing(node)
      case "DummyAbs":
        return this.visitDummyAbstraction(node)
      case "BinOp":
        return this.visitBinOp(node)


      default:
        throw new Error("Unknown AST node: " + node.rule)
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: ProofTree): R

  protected abstract visitAbs(node: ProofTree): R

  protected abstract visitApp(node: ProofTree): R

  protected abstract visitLit(node: ProofTree): R

  protected abstract visitIfCondition(node: ProofTree): R

  protected abstract visitInl(node: ProofTree): R

  protected abstract visitInr(node: ProofTree): R

  protected abstract visitCase(node: ProofTree): R

  protected abstract visitVariantCase(node: ProofTree): R

  protected abstract visitVariant(node: ProofTree): R

  protected abstract visitAscribe(node: ProofTree): R

  protected abstract visitTuple(node: ProofTree): R

  protected abstract visitTupleProjection(node: ProofTree): R

  protected abstract visitRecord(node: ProofTree): R

  protected abstract visitRecordProjection(node: ProofTree): R

  protected abstract visitSequencing(node: ProofTree): R

  protected abstract visitDummyAbstraction(node: ProofTree): R

  protected abstract visitBinOp(node: ProofTree): R

}
