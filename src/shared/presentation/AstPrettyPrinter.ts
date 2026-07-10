import type {
  Abs,
  App,
  Ascribe,
  Case,
  DummyAbstraction,
  FunDecl,
  GlobalDecl,
  IfCondition,
  Inl,
  Inr,
  Lit,
  Program,
  Record,
  RecordProjection,
  Sequencing,
  Term,
  Tuple,
  TupleProjection,
  Type,
  Var,
  VarDecl,
  Variant,
  VariantCase,
} from "@/shared/core/domain/ast";
import { typeToString } from "@/shared/core/application/typecheck/utils.ts";

/**
 * Converts an AST back into the surface syntax used by the lambda editor.
 *
 * Output goals:
 * - Stable, readable, and parseable by the existing parser.
 * - Minimal parentheses, but always safe.
 */
export class AstPrettyPrinter {
  printProgram(program: Program): string {
    const parts: string[] = [];

    for (const g of program.globals) {
      parts.push(this.printGlobalDecl(g) + ";");
    }

    if (program.term) {
      parts.push(this.printTerm(program.term) + ";");
    }

    return parts.join("\n");
  }

  printGlobalDecl(decl: GlobalDecl): string {
    switch (decl.kind) {
      case "VarDecl":
        return this.printVarDecl(decl);
      case "FunDecl":
        return this.printFunDecl(decl);
    }
  }

  private printVarDecl(decl: VarDecl): string {
    if (decl.value.id)
      return `${decl.name} : ${this.printType(decl.type)} = ${this.printTerm(decl.value)}`;
    else
      return `${decl.name} : ${this.printType(decl.type)}`;

  }

  private printFunDecl(decl: FunDecl): string {
    // Same syntax as VarDecl in this language.
    return `${decl.name} : ${this.printType(decl.type)} = ${this.printTerm(decl.value)}`;
  }

  printTerm(term: Term): string {
    switch (term.kind) {
      case "Var":
        return this.printVar(term);
      case "Abs":
        return this.printAbs(term);
      case "App":
        return this.printApp(term);
      case "Lit":
        return this.printLit(term);
      case "Inl":
        return this.printInl(term);
      case "Inr":
        return this.printInr(term);
      case "IfCondition":
        return this.printIfCondition(term);
      case "Case":
        return this.printCase(term);
      case "VariantCase":
        return this.printVariantCase(term);
      case "Variant":
        return this.printVariant(term);
      case "Ascribe":
        return this.printAscribe(term);
      case "TupleProjection":
        return this.printTupleProjection(term);
      case "RecordProjection":
        return this.printRecordProjection(term);
      case "Record":
        return this.printRecord(term);
      case "Sequencing":
        return this.printSequencing(term);
      case "Tuple":
        return this.printTuple(term);
      case "DummyAbstraction":
        return this.printDummyAbstraction(term);
    }
  }

  private printInl(t: Inl): string {
    return `(inl ${this.printTerm(t.term)} as ${this.printType(t.type)})`;
  }

  private printInr(t: Inr): string {
    return `(inr ${this.printTerm(t.term)} as ${this.printType(t.type)})`;
  }

  private printIfCondition(t: IfCondition): string {
    let s = `if ${this.printTerm(t.condition)} then ${this.printTerm(t.then)}`;
    for (const branch of t.elif ?? []) {
      s += ` elseif ${this.printTerm(branch.condition)} then ${this.printTerm(branch.then)}`;
    }
    if (t.else) {
      s += ` else ${this.printTerm(t.else)}`;
    }
    return `(${s})`;
  }

  private printCase(t: Case): string {
    return `(case ${this.printTerm(t.variable)} || inl ${t.inl.variable} => ${this.printTerm(t.inl.term)} || inr ${t.inr.variable} => ${this.printTerm(t.inr.term)})`;
  }

  private printVariantCase(t: VariantCase): string {
    const cases = t.cases.map((c) => `[${c.label}=${c.variable}] => ${this.printTerm(c.body)}`).join(" || ");
    return `(case ${this.printTerm(t.variable)} of ${cases})`;
  }

  private printVariant(t: Variant): string {
    const fields = t.variants.map((v) => `${v.label}=${this.printTerm(v.term)}`).join(", ");
    return `[${fields}] as ${this.printType(t.type)}`;
  }

  private printAscribe(t: Ascribe): string {
    return `(${this.printTerm(t.term)} as ${this.printType(t.type)})`;
  }

  private printTupleProjection(t: TupleProjection): string {
    return `${this.printTerm(t.tuple)}.${t.index}`;
  }

  private printRecordProjection(t: RecordProjection): string {
    return `${this.printTerm(t.term)}.${t.label}`;
  }

  private printRecord(t: Record): string {
    const fields = t.fields.map((f) => `${f.label}=${this.printTerm(f.term)}`).join(", ");
    return `<${fields}>`;
  }

  private printSequencing(t: Sequencing): string {
    return `(${this.printTerm(t.first)}; ${this.printTerm(t.second)})`;
  }

  private printTuple(t: Tuple): string {
    const elements = t.elements.map((e) => this.printTerm(e)).join(", ");
    return `<${elements}>`;
  }

  private printDummyAbstraction(t: DummyAbstraction): string {
    return `(λ _ : ${this.printType(t.paramType)} . ${this.printTerm(t.body)})`;
  }

  private printVar(v: Var): string {
    return v.name;
  }

  private printLit(lit: Lit): string {
    return String(lit.value);
  }

  private printAbs(abs: Abs): string {
    // Parser example in repo uses: (λ x : T . (x) : T -> T)
    const body = this.printTerm(abs.body);
    const annotatedType = abs.type ? ` : ${this.printType(abs.type)}` : "";
    return `(λ ${abs.param} : ${this.printType(abs.paramType)} . ${body}${annotatedType})`;
  }

  private printApp(app: App): string {
    // Always parenthesize app to match typical parser expectations.
    return `(${this.printTerm(app.func)} ${this.printTerm(app.arg)})`;
  }

  printType(type: Type): string {
    // Reuse existing typeToString implementation (TyVar/TyArrow)
    return typeToString(type);
  }
}

export function astToText(program: Program): string {
  return new AstPrettyPrinter().printProgram(program);
}
