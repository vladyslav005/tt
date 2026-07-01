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


      default:
        throw new Error("Unknown AST node: " + node.rule)
    }
  }

  /* ===== AST nodes ===== */
  protected abstract visitVar(node: ProofTree): R

  protected abstract visitAbs(node: ProofTree): R

  protected abstract visitApp(node: ProofTree): R

  protected abstract visitLit(node: ProofTree): R

}
