import type { Program, GlobalDecl, Term, Type, VarDecl, FunDecl, Var, Abs, App, Lit } from "@/shared/core/domain/ast";
import { typeToString } from "@/shared/core/domain/typecheck/utils.ts";

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
    return `${decl.name} : ${this.printType(decl.type)} = ${this.printTerm(decl.value)}`;
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
    }
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
