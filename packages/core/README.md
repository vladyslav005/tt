# @vladyslav005/tt-core

A **pure TypeScript library** for parsing, type-checking, and evaluating Simply Typed Lambda Calculus (STLC) with beautiful proof tree visualization and Curry–Howard correspondence support.

No React dependencies. Zero side effects. Framework-agnostic.

---

## ✨ Features

- **Lambda Calculus Parser** — ANTLR4-based parser with syntax error recovery
- **Type Checker** — Full STLC type inference producing complete derivation trees
- **Evaluator** — Multiple reduction strategies (call-by-value, call-by-name, normal order)
- **Proof Trees** — Complete typing derivations with error nodes for failed type checks
- **Curry–Howard** — Transform typing proofs to logical proofs (intuitionistic natural deduction)
- **Pretty Printing** — Convert AST back to readable lambda calculus syntax
- **LaTeX Export** — Generate publication-quality proof trees (via ebproof)
- **Type Utilities** — Type equality, normalization, and string conversion

---

## 📦 Installation

```bash
npm install @vladyslav005/tt-core
```

Or with pnpm / yarn:

```bash
pnpm add @vladyslav005/tt-core
yarn add @vladyslav005/tt-core
```

---

## 🚀 Quick Start

### Parse a Lambda Term

```typescript
import { AntlrParserAdapter } from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();

// Parse a simple lambda term
const result = parser.parse('λx.x');

if (!result.hasError) {
  console.log(result.program);  // AST
  console.log(result.program.term);  // The lambda term
} else {
  console.error(result.errors);  // Syntax errors
}
```

### Type-Check a Term

```typescript
import {
  AntlrParserAdapter,
  SLTLCTypeChecker,
  typeToString,
} from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();
const typeChecker = new SLTLCTypeChecker();

const parseResult = parser.parse('λx.x');
const proofTree = typeChecker.check(parseResult.program.term);

console.log('Type:', typeToString(proofTree.type));
// Output: Type: A → A

if (proofTree.error) {
  console.error('Type error:', proofTree.error);
} else {
  console.log('✓ Well-typed!');
}
```

### Evaluate a Term

```typescript
import {
  AntlrParserAdapter,
  SLTLCTypeChecker,
  Evaluator,
  EvaluationStrategy,
} from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();
const typeChecker = new SLTLCTypeChecker();
const evaluator = new Evaluator();

// Parse and type-check
const parseResult = parser.parse('(λx.x λy.y)');
const proofTree = typeChecker.check(parseResult.program.term);

// Only evaluate if well-typed
if (!proofTree.error) {
  const result = evaluator.evaluate(
    parseResult.program.term,
    EvaluationStrategy.NORMAL
  );

  console.log('Final term:', result.final);
  console.log('Reduction steps:', result.steps.length);
}
```

### Generate Proof Trees for Visualization

```typescript
import {
  AntlrParserAdapter,
  SLTLCTypeChecker,
  TexMapper,
} from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();
const typeChecker = new SLTLCTypeChecker();
const texMapper = new TexMapper();

const parseResult = parser.parse('λx.x');
const proofTree = typeChecker.check(parseResult.program.term);

// Generate LaTeX representation
const texTree = texMapper.mapProofTree(proofTree);

console.log(texTree);  // Structured tree for rendering
```

### Convert to Logical Proofs (Curry–Howard)

```typescript
import {
  AntlrParserAdapter,
  SLTLCTypeChecker,
  LogicMapper,
} from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();
const typeChecker = new SLTLCTypeChecker();
const logicMapper = new LogicMapper();

const parseResult = parser.parse('λx.λy.x');
const proofTree = typeChecker.check(parseResult.program.term);

// Transform typing proof to logical proof
const logicalProof = logicMapper.mapProofTree(proofTree);

console.log(logicalProof);  // Intuitionistic natural deduction
```

---

## 📚 Core APIs

### Parser

```typescript
interface Parser {
  parse(text: string): ParseResult;
}

type ParseResult = {
  program: Program;
  hasError: boolean;
  errors: ParseSyntaxError[];
};
```

**Usage:**
```typescript
import { AntlrParserAdapter } from '@vladyslav005/tt-core';

const parser = new AntlrParserAdapter();
const result = parser.parse('λf.λx.f (f x)');
```

---

### Type Checker

```typescript
class SLTLCTypeChecker {
  check(term: Term): ProofTree;
  checkProgram(program: Program): ProofTree;
}

type ProofTree = {
  rule: 'Var' | 'Abs' | 'App';
  premises: ProofTree[];      // Subproofs
  gamma: Gamma;               // Type context
  term: Term;                 // The term being typed
  type: Type;                 // Derived type
  error?: TypeCheckError;     // Error (if any)
};
```

**Usage:**
```typescript
import { SLTLCTypeChecker } from '@vladyslav005/tt-core';

const typeChecker = new SLTLCTypeChecker();
const proof = typeChecker.check(term);

// Traverse the proof tree
console.log(proof.rule);           // 'Abs', 'App', or 'Var'
console.log(proof.premises);       // Subproofs
console.log(proof.type);           // Inferred type
console.log(proof.gamma);          // Type bindings in context
```

---

### Evaluator

```typescript
enum EvaluationStrategy {
  NORMAL = 'NORMAL',
  CALL_BY_VALUE = 'CALL_BY_VALUE',
  CALL_BY_NAME = 'CALL_BY_NAME',
}

class Evaluator {
  evaluate(term: Term, strategy: EvaluationStrategy): EvaluationResult;
}

type EvaluationResult = {
  strategy: EvaluationStrategy;
  steps: ReductionStep[];     // Trace of reductions
  final: Term;                // Final term (normal form or stuck)
  errors?: string[];
};

type ReductionStep = {
  term: Term;
  redex: Term;                // The subterm being reduced
  contractum: Term;           // Result of reduction
  explanation: string;
};
```

**Usage:**
```typescript
import { Evaluator, EvaluationStrategy } from '@vladyslav005/tt-core';

const evaluator = new Evaluator();
const result = evaluator.evaluate(term, EvaluationStrategy.CALL_BY_VALUE);

console.log(`Took ${result.steps.length} steps`);
result.steps.forEach((step, i) => {
  console.log(`Step ${i + 1}: ${step.explanation}`);
});
console.log('Final:', result.final);
```

---

### AST Types

```typescript
type Program = {
  globalDecls: GlobalDecl[];
  term: Term;
};

type GlobalDecl = FunDecl | VarDecl;

type Term
  = Variable { name: string; id: string }
  | Abstraction { param: string; body: Term; id: string }
  | Application { func: Term; arg: Term; id: string }
  | Literal { value: string; id: string };

type Type
  = TypeVariable { name: string }
  | FunctionType { from: Type; to: Type };
```

---

### Utilities

#### Pretty-print Terms

```typescript
import { astToText, AstPrettyPrinter } from '@vladyslav005/tt-core';

const text = astToText(term);
console.log(text);  // "λx.x" or "(λx.x λy.y)", etc.

// Or with custom printer
const printer = new AstPrettyPrinter();
const formatted = printer.print(term);
```

#### Type Utilities

```typescript
import {
  typeToString,
  typeEquals,
  normalizeType,
  expandTypeAliases,
  kindToString,
} from '@vladyslav005/tt-core';

const ty = proofTree.type;

console.log(typeToString(ty));     // "A → B → C"
console.log(typeEquals(ty1, ty2)); // boolean
console.log(normalizeType(ty));    // Normalized form

// For type theory with kinds
const kind = /* ... */;
console.log(kindToString(kind));   // "*", "* → *", etc.
```

#### Type Checking Utilities

```typescript
import { termIndexEquals, termIndexToString } from '@vladyslav005/tt-core';

// Compare term occurrences by structural identity
const isSame = termIndexEquals(idx1, idx2);

// String representation for debugging
console.log(termIndexToString(idx));
```

---

### Proof Tree Visitors

Traverse proof trees with the visitor pattern:

```typescript
import { ProofTreeVisitor } from '@vladyslav005/tt-core';

class MyProofVisitor extends ProofTreeVisitor<string> {
  visitVar(proof: ProofTree): string {
    return `Var: ${proof.term.name} : ${typeToString(proof.type)}`;
  }

  visitAbs(proof: ProofTree): string {
    const subProof = proof.premises[0].accept(this);
    return `Abs: [${subProof}]`;
  }

  visitApp(proof: ProofTree): string {
    const funcProof = proof.premises[0].accept(this);
    const argProof = proof.premises[1].accept(this);
    return `App: (${funcProof}) (${argProof})`;
  }
}

const visitor = new MyProofVisitor();
const result = proofTree.accept(visitor);
```

### AST Visitors

Traverse terms with the visitor pattern:

```typescript
import { AstVisitor } from '@vladyslav005/tt-core';

class CountVars extends AstVisitor<number> {
  visitVar(term: Variable): number {
    return 1;
  }

  visitAbs(term: Abstraction): number {
    return term.body.accept(this);
  }

  visitApp(term: Application): number {
    return term.func.accept(this) + term.arg.accept(this);
  }

  visitLit(term: Literal): number {
    return 0;
  }
}

const counter = new CountVars();
const varCount = term.accept(counter);
```

---

## 📝 Lambda Calculus Syntax

The parser supports standard lambda calculus notation:

```
⟨term⟩  ::= ⟨var⟩
           | λ ⟨var⟩ . ⟨term⟩         # Abstraction
           | ⟨term⟩ ⟨term⟩            # Application
           | ( ⟨term⟩ )               # Grouping

⟨type⟩  ::= ⟨tyvar⟩                   # Type variable (A, B, C, ...)
           | ⟨type⟩ → ⟨type⟩         # Function type (right-associative)

⟨var⟩   ::= [a-zA-Z_][a-zA-Z0-9_]*   # Identifiers
```

### Examples

```
λx.x                     # Identity
λx.λy.x                  # Constant (K combinator)
λf.λx.f (f x)            # Church numeral 2
λf.λg.λx.f (g x)         # Composition
(λx.x) (λy.y)            # Application
λx.λy.λz.x (y z)         # S combinator
```

---

## 🎯 Architecture

```
┌─────────────────────────────────────┐
│      Domain Layer (Pure TS)         │
│  AST | Type | ProofTree             │
│  STLCTypeChecker | Evaluator        │
└─────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────┐
│   Application Layer (Visitors)      │
│  AstVisitor | ProofTreeVisitor      │
│  Parser interface                   │
└─────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────┐
│  Adapter Layer (ANTLR + Mappers)    │
│  AntlrParserAdapter                 │
│  TexMapper | LogicMapper             │
│  AstPrettyPrinter                   │
└─────────────────────────────────────┘
         ▲
         │
┌─────────────────────────────────────┐
│      Parser Layer (ANTLR)           │
│  LambdaLexer | LambdaParser         │
│  ProgramBuilderVisitor              │
└─────────────────────────────────────┘
```

---

## 🔄 Workflow Example

Complete end-to-end workflow:

```typescript
import {
  AntlrParserAdapter,
  SLTLCTypeChecker,
  Evaluator,
  EvaluationStrategy,
  TexMapper,
  astToText,
  typeToString,
} from '@vladyslav005/tt-core';

// 1. Parse
const parser = new AntlrParserAdapter();
const parseResult = parser.parse('(λx.x λy.y)');

if (parseResult.hasError) {
  console.error('Syntax error:', parseResult.errors);
  process.exit(1);
}

// 2. Type-check
const typeChecker = new SLTLCTypeChecker();
const proofTree = typeChecker.check(parseResult.program.term);

if (proofTree.error) {
  console.error('Type error:', proofTree.error.message);
  process.exit(1);
}

console.log('✓ Type:', typeToString(proofTree.type));

// 3. Visualize (LaTeX)
const texMapper = new TexMapper();
const proofViz = texMapper.mapProofTree(proofTree);
console.log('Proof structure:', JSON.stringify(proofViz, null, 2));

// 4. Evaluate
const evaluator = new Evaluator();
const evalResult = evaluator.evaluate(
  parseResult.program.term,
  EvaluationStrategy.NORMAL
);

console.log(`✓ Evaluation: ${evalResult.steps.length} steps`);
console.log('Final term:', astToText(evalResult.final));
```

---

## 🧪 Error Handling

### Parse Errors

```typescript
const result = parser.parse('λx.y.z');  // Invalid syntax

if (result.hasError) {
  result.errors.forEach(err => {
    console.log(`Line ${err.line}, Column ${err.column}: ${err.message}`);
  });
}
```

### Type Errors

```typescript
const proof = typeChecker.check(term);

if (proof.error) {
  console.log('Rule attempted:', proof.error.rule);
  console.log('Judgment:', proof.error.judgment);
  console.log('Reason:', proof.error.message);
  
  // Inspect partial derivation
  console.log('Premises:', proof.premises);
}
```

---

## 🏗️ Building & Publishing

### Build

```bash
npm run build
```

Builds to `dist/`:
- `dist/index.js` — ESM
- `dist/index.cjs` — CommonJS
- `dist/index.d.ts` — TypeScript declarations

### Regenerate Grammar

If you modify `Lambda.g4`:

```bash
npm run gen-grammar
```

This regenerates ANTLR4 files in `src/antlr/`.

---

## 📖 Concepts

### Simply Typed Lambda Calculus (STLC)

A minimal functional language:
- **Variables** (`x`, `y`): refer to bound values
- **Abstractions** (`λx.e`): anonymous functions
- **Applications** (`e₁ e₂`): function calls
- **Types** (`A → B`): ensure type safety at compile time

### Proof Trees

Type checking returns **full derivation trees**, not just yes/no:

```
    x : A ∈ Γ
  ─────────────  (Var)
    Γ ⊢ x : A


    Γ, x:A ⊢ e : B
  ─────────────────  (Abs)
    Γ ⊢ λx.e : A→B


  Γ ⊢ f : A→B    Γ ⊢ a : A
  ──────────────────────────  (App)
        Γ ⊢ f a : B
```

Each node is a `ProofTree` with rule, premises, context, term, and type.

### Evaluation Strategies

- **Normal order** (also "lazy"): Reduce outermost redex first
- **Call-by-value**: Evaluate arguments before function calls
- **Call-by-name**: Like normal order but cache results

### Curry–Howard Correspondence

A fundamental isomorphism between:
- **Types** ↔ **Propositions** (in intuitionistic logic)
- **Typing proofs** ↔ **Logical proofs**
- **Lambda terms** ↔ **Programs** (or **constructive proofs**)

Example: `λx.x : A → A` corresponds to the proof `λx.x` of the proposition `A → A`.

---

## 🤝 Contributing

Contributions welcome! Please:

1. Follow TypeScript strict mode rules
2. No `any` types without justification
3. Add comments only where clarification is needed
4. Keep core logic pure (no side effects)
5. Run `npm run build` before submitting

---

## 📜 License

MIT — See LICENSE file

---

## 🔗 Related

- **Main project**: [tt](https://github.com/vladyslav005/tt) — Interactive web UI for this library
- **Live demo**: [tt-woad.vercel.app](https://tt-woad.vercel.app/)

---

## 📧 Support

- **GitHub Issues**: Report bugs or request features
- **NPM Package**: [npmjs.com/package/@vladyslav005/tt-core](https://www.npmjs.com/package/@vladyslav005/tt-core)

---

**tt-core** — Pure TypeScript lambda calculus toolkit. 🚀
