import {
  ERROR_TYPE,
  type InferProofTree, type ProofTree, Rule, type Substitution, type TypeScheme,
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
  RecordProjection, Sequencing, Tuple, TupleProjection, Type, Var, Variant, VariantCase
} from "@/shared/core/domain/ast";
import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {TypeInferenceEngine} from "@/shared/core/application/typecheck/TypeInferenceEngine.ts";
export class LetPolymorphismInferenceVisitor extends AstVisitor<InferProofTree> {

  private schemeContext: Gamma<TypeScheme> = new Gamma<TypeScheme>();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();
  private readonly engine: TypeInferenceEngine = new TypeInferenceEngine();
  private currentVarRule: Rule.CtVar | Rule.CtVarLet = Rule.CtVar;


  constructor(context: Gamma<Type>, errorBuffer: Error[], globalProofs: Map<string, ProofTree>) {
    super();
    this.schemeContext = this.engine.toSchemeGamma(context);
    this.errorBuffer = errorBuffer;
    this.globalProofs = globalProofs;
  }


  public check(node: Let): ProofTree {
    const proof = this.visit(node);

    try {
      const substitution = this.engine.solve(proof.constraints);

      return this.engine.applySubstitutionToProof(
        proof,
        substitution,
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));

      return {
        ...proof,
        type: ERROR_TYPE,
        error: msg,
      };
    }
  }


  protected visitVar(node: Var): InferProofTree {
    const scheme = this.schemeContext.get(node.name);

    if (!scheme) {
      const msg = `Variable "${node.name}" is not in scope`;
      this.errorBuffer.push(new Error(msg));

      return {
        rule: this.currentVarRule,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [],
        constraints: [],
        error: msg,
      };
    }

    const type = this.engine.instantiate(scheme);

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
    // 1. Infer the left side: let x = value in body
    const valueProof = this.visit(node.value);

    let valueSubstitution: Substitution;

    // 2. Solve only constraints from the left side
    try {
      valueSubstitution = this.engine.solve(valueProof.constraints);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.errorBuffer.push(new Error(msg));

      return {
        rule: Rule.Let,
        term: node,
        type: ERROR_TYPE,
        gamma: this.schemeContext.serializeGamma(),
        premises: [valueProof],
        constraints: [],
        error: msg,
      };
    }

    // 3. Apply substitution to the inferred value type
    const solvedValueType = this.engine.applySubstitution(
      valueProof.type,
      valueSubstitution,
    );

    // 4. Apply substitution to the current context before generalization
    this.schemeContext = this.engine.applySubstitutionToContext(
      this.schemeContext,
      valueSubstitution,
    );

    // 5. Generalize the solved value type
    const generalizedScheme = this.engine.generalize(
      solvedValueType,
      this.schemeContext,
    );

    // 6. Temporarily add x : generalizedScheme to context
    const oldBinding = this.schemeContext.get(node.name);
    this.schemeContext.add(node.name, generalizedScheme);

    // Optional: if you want proof tree to distinguish variables inside let body
    const previousVarRule = this.currentVarRule;
    this.currentVarRule = Rule.CtVarLet;

    // 7. Infer the right side under extended context
    const bodyProof = this.visit(node.body);

    // Restore var rule
    this.currentVarRule = previousVarRule;

    // 8. Restore previous context binding
    if (oldBinding) {
      this.schemeContext.add(node.name, oldBinding);
    } else {
      this.schemeContext.delete(node.name);
    }

    // 9. Return the body type and body constraints.
    // These body constraints are solved later in check().
    return {
      rule: Rule.Let,
      term: node,
      type: bodyProof.type,
      gamma: this.schemeContext.serializeGamma(),
      premises: [
        this.engine.applySubstitutionToProof(
          valueProof,
          valueSubstitution,
        ),
        bodyProof,
      ],
      constraints: bodyProof.constraints,
    };
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
