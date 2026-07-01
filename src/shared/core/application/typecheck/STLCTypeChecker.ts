import {AstVisitor} from "@/shared/core/application/AstVisitor.ts";
import type {Abs, App, ASTNode, GlobalDecl, Lit, Program, TyArrow, Var, Type, TyVar} from "@/shared/core/domain/ast";
import {Gamma} from "@/shared/core/application/typecheck/Gamma.ts";
import {typeEquals, typeToString} from "@/shared/core/application/typecheck/utils.ts";
import {type ProofTree, Rule} from "@/shared/core/application/typecheck/ProofTree.ts";

// Sentinel type used as a placeholder when the real type cannot be inferred due to an error.
const ERROR_TYPE: TyVar = { kind: "TyVar", id: "error-sentinel", name: "?" };

export class SLTLCTypeChecker extends AstVisitor<ProofTree> {

  private context: Gamma = new Gamma();
  private errorBuffer: Error[] = [];
  private globalProofs: Map<string, ProofTree> = new Map();

  public getErrors(): Error[] {
    return this.errorBuffer;
  }

  visit(node: ASTNode): ProofTree {
    const proof = super.visit(node);
    proof.id = node.id;
    return proof;
  }

  protected visitProgram(node: Program): ProofTree {
    this.context.clear();
    this.errorBuffer = [];
    this.globalProofs = new Map();
    node.globals.forEach((g) => this.visit(g));

    if (!node.term) {
      const msg = "No main expression — write a term after your declarations";
      this.errorBuffer.push(new Error(msg));
      return {
        rule: Rule.Var,
        term: { kind: "Var", id: node.id, name: "(empty)" } as any,
        type: ERROR_TYPE,
        gamma: this.context.serializeGamma(),
        premises: [],
        error: msg,
      };
    }

    return this.visit(node.term);
  }

  protected visitAbs(node: Abs): ProofTree {
    this.context.add(node.param, node.paramType);
    const bodyProof: ProofTree = this.visit(node.body);
    this.context.delete(node.param);

    const abstractionType: TyArrow = {
      kind: "TyArrow",
      id: crypto.randomUUID(),
      from: node.paramType,
      to: bodyProof.type,
    };

    return {
      rule: Rule.Abs,
      term: node,
      type: abstractionType,
      gamma: this.context.serializeGamma(),
      premises: [bodyProof],
    };
  }

  protected visitApp(node: App): ProofTree {
    const funcProof: ProofTree = this.visit(node.func);
    const argProof: ProofTree = this.visit(node.arg);

    const returnProof: ProofTree = {
      rule: Rule.App,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [funcProof, argProof],
    };

    if (funcProof.type.kind !== "TyArrow") {
      const msg = `Cannot apply a non-function — the left-hand side has type ${typeToString(funcProof.type)}, which is not a function type`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
      return returnProof;
    }

    const funcType = funcProof.type as TyArrow;
    returnProof.type = funcType.to;

    if (!typeEquals(funcType.from, argProof.type)) {
      const msg = `Argument type mismatch — function expects ${typeToString(funcType.from)}, but got ${typeToString(argProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      returnProof.error = msg;
    }

    return returnProof;
  }

  protected visitTermDecl(node: GlobalDecl): ProofTree {
    const valueProof: ProofTree = this.visit(node.value);

    // Always add the declared type to context so subsequent declarations
    // and the main term can still be type-checked.
    this.context.add(node.name, node.type);
    this.globalProofs.set(node.name, valueProof);

    if (!typeEquals(valueProof.type, node.type)) {
      const msg = `Declaration "${node.name}": declared type is ${typeToString(node.type)}, but the value has type ${typeToString(valueProof.type)}`;
      this.errorBuffer.push(new Error(msg));
      // Attach the error to the value proof so it surfaces in a T-Def expansion.
      valueProof.error = (valueProof.error ? valueProof.error + "; " : "") + msg;
    }

    return {} as ProofTree;
  }

  protected visitTypeDecl(node: GlobalDecl): ProofTree {
    this.context.add(node.name, node.type);
    return {} as ProofTree;
  }

  protected visitVar(node: Var): ProofTree {
    const varType = this.context.get(node.name);

    const returnProof: ProofTree = {
      rule: Rule.Var,
      term: node,
      type: ERROR_TYPE,
      gamma: this.context.serializeGamma(),
      premises: [],
    };

    if (!varType) {
      const contextKeys = Object.keys(this.context.serializeGamma());
      const contextHint = contextKeys.length > 0
        ? ` (in-scope variables: ${contextKeys.join(", ")})`
        : " (context is empty)";
      const msg = `Variable "${node.name}" is not in scope${contextHint}`;
      returnProof.error = msg;
      this.errorBuffer.push(new Error(msg));
      return returnProof;
    }

    returnProof.type = varType;

    const definitionProof = this.globalProofs.get(node.name);
    if (definitionProof) {
      returnProof.premises = [definitionProof];
    }

    return returnProof;
  }

  protected visitLit(node: Lit): ProofTree {
    const typeName = node.value === "unit"
      ? "Unit"
      : (node.value === "true" || node.value === "True" || node.value === "false" || node.value === "False")
        ? "Bool"
        : "Nat";

    const litType: TyVar = {
      kind: "TyVar",
      id: crypto.randomUUID(),
      name: typeName,
    };

    return {
      rule: Rule.Lit,
      term: node,
      type: litType,
      gamma: this.context.serializeGamma(),
      premises: [],
    };
  }

  protected visitType(node: Type): ProofTree {
    return {
      rule: "Type" as any,
      term: node as any,
      type: node as any,
      gamma: this.context.serializeGamma(),
      premises: [],
    } as ProofTree;
  }
}
