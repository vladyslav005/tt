import {
  ERROR_TYPE,
  type InferProofTree, type ProofTree, Rule,
} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {
  Abs,
  App,
  Ascribe,
  Case,
  DummyAbstraction, GlobalDecl,
  IfCondition,
  Inl,
  Inr, Let,
  Lit, Program,
  Record,
  RecordProjection, Sequencing, Tuple, TupleProjection, Type, TypeScheme, Var, Variant, VariantCase
} from "@/shared/core/domain/ast";
import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
export class LetPolymorphismInferenceVisitor extends AstVisitor<InferProofTree> {

  private schemeContext: Gamma<TypeScheme> = new Gamma<TypeScheme>();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();
  private freshCounter = 0;


  constructor(context: Gamma<Type>, errorBuffer: Error[], globalProofs: Map<string, ProofTree>) {
    super();
    this.schemeContext = this.toSchemeGamma(context);
    this.errorBuffer = errorBuffer;
    this.globalProofs = globalProofs;
  }

  private toSchemeGamma(gamma: Gamma<Type>): Gamma<TypeScheme> {
    const result = new Gamma<TypeScheme>();

    for (const [name, type] of gamma.entries()) {
      result.add(name, {
        id: crypto.randomUUID(),
        kind: "TypeScheme",
        vars: [],
        type,
      });
    }

    return result;
  }

  protected visitVar(node: Var): InferProofTree {
    const scheme = this.schemeContext.get(node.name);

    if (!scheme) {
      const msg = `Variable "${node.name}" is not in scope`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.Var,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [],
        constraints: [],
        error: msg,
      };
    }

    const type = this.instantiate(scheme);

    return {
      rule: Rule.Var,
      term: node,
      type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [],
      constraints: [],
    };
  }


  protected visitAbs(node: Abs): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitApp(node: App): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitLit(node: Lit): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitVariantCase(node: VariantCase): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitInl(node: Inl): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitInr(node: Inr): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitIfCondition(node: IfCondition): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitCase(node: Case): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitVariant(node: Variant): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitAscribe(node: Ascribe): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitRecordProjection(node: RecordProjection): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitRecord(node: Record): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitTuple(node: Tuple): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitTupleProjection(node: TupleProjection): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitSequencing(node: Sequencing): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitDummyAbstraction(node: DummyAbstraction): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitLet(node: Let): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitTermDecl(node: GlobalDecl): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitTypeDecl(node: GlobalDecl): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitProgram(node: Program): InferProofTree {
    throw new Error("Method not implemented.");
  }
  protected visitType(node: Type): InferProofTree {
    throw new Error("Method not implemented.");
  }
}