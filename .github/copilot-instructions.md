# Copilot instructions for the "tt" repository

This file describes repository-specific commands, architecture, and conventions to help Copilot-based assistants produce useful edits and suggestions.

---

## 1) Build, test, and lint commands

- Install dependencies (npm):
  - npm install

- Development server (hot reload):
  - npm run dev
  - This runs: vite

- Build (typecheck + bundle):
  - npm run build
  - This runs: tsc -b && vite build

- Preview production build:
  - npm run preview
  - This runs: vite preview

- Linting:
  - npm run lint
  - This runs: eslint .

- Running a single test:
  - This repository currently has no test runner configured in package.json. If tests are added, follow the project's test runner (Vitest/Jest) conventions. For example with Vitest: `npx vitest run path/to/testfile` or with Jest: `npx jest path/to/testfile`.

---

## 2) High-level architecture (big-picture)

- Frontend app built with React + Vite (TypeScript). Entry: `src/main.tsx` → `src/app/App.tsx`.

- Routing: React Router v6 is used; router defined in `src/app/router/router.tsx` with routes: `/main`, `/about` and a not-found route.

- DI/container: `src/app/providers/di/makeDependencies.ts` wires core services used across the app:
  - parser: AntlrParserAdapter (ANTLR-based parser for the lambda language)
  - typeCheckerSLTC: SLTLCTypeChecker (static typechecker producing proof trees)
  - texMapper: TexMapper (maps AST/proofs to TeX for rendering)
  - flowMapper: AstFlowMapper (maps AST to flow/graph visualization)

- State: Redux Toolkit store at `src/app/providers/store.ts` (slice: `term` in `src/shared/ui-state/termSlice.ts`). AppProviders wraps the app to provide store and other providers.

- Language front-end/core:
  - ANTLR grammar and generated parser live under `src/shared/core/antlr/` (Lambda.g4, generated Lexer/Parser/Visitor).
  - Parser adapter: `AntlrParserAdapter` converts text input to an internal `Program` AST using a ProgramBuilderVisitor.
  - AST domain model: `src/shared/core/domain/ast/*` defines AST node types and helper builders.
  - Typechecking: `src/shared/core/domain/typecheck/*` contains a STLC typechecker producing `ProofTree` objects and a Gamma (context) implementation.

- UI/Presentation:
  - AST visualization and flow nodes under `src/features/ast/` (components and flow node mappings).
  - Proof tree presentation under `src/features/proof-tree/` with both CSS-based and TeX-based renderers.
  - Editor integration in `src/features/editor/*` uses Monaco editor and connects to parser/typechecker.

- Build system / tooling:
  - Vite with React SWC plugin and Tailwind via `@tailwindcss/vite` plugin.
  - TypeScript project references: `tsconfig.json` references `tsconfig.app.json` and `tsconfig.node.json`.


---

## 3) Key conventions and patterns

- Path alias "@" is set to `./src` in `vite.config.ts` and tsconfig paths. Use `@/...` imports consistently.

- Dependency wiring uses a simple factory `makeDependencies()` rather than a reflective DI container. When adding new core services, register them there and update `Dependencies` type.

- Parser / AST flow:
  - Text → ANTLR parser → parse tree → ProgramBuilderVisitor → Program AST.
  - Consumers expect `Program` AST nodes to have stable `id` fields used by visualization and proof mapping.

- Typechecking returns `ProofTree` objects rather than simple true/false results. `ProofTree` includes:
  - rule, term, type, gamma, premises, optional error
  - Consumers render partial proofs and error nodes; do not assume missing proof means a fatal error.

- Error handling in core pipeline:
  - Parser and typechecker often surface errors via returned objects (e.g., proof nodes with `error`) and/or push to an internal `errorBuffer`. GUI shows structured error nodes; prefer returning structured errors over throwing in UI flows.

- Code generation from grammar:
  - ANTLR-generated files under `src/shared/core/antlr/` are checked into the repo (Lexer/Parser/Visitor). If regenerating grammar, ensure generated TS files match the project's build settings and update imports.

- Random IDs:
  - Some domain objects (types, nodes) use `crypto.randomUUID()` to generate ids. When writing deterministic tests or snapshots, stub/override this or normalize ids.

- TypeScript strictness:
  - TS config enables strict rules; keep code free of any `any` leaks when adding new modules. If `any` is necessary, localize and justify with a comment.

- UI components and presentation layer:
  - Visualizers map domain objects to UI nodes via mapper classes (TexMapper, FlowMapper). Updating visual behavior should modify mappers rather than scattering mapping logic across components.

---

## 4) Files to check first when making changes

- Core language changes: `src/shared/core/antlr/Lambda.g4`, ProgramBuilderVisitor, AntlrParserAdapter, AST domain files under `src/shared/core/domain/`.
- Typechecker changes: `src/shared/core/domain/typecheck/*` (ProofTree, STLCTypeChecker, Gamma).
- Wiring/DI: `src/app/providers/di/makeDependencies.ts` and `src/app/providers/DependencyProvider.tsx`.
- Visual/Presentation: `src/features/ast/*`, `src/features/proof-tree/*`, `src/shared/presentation/*`.

---

## 5) Existing AI assistant configs incorporated

- No CLAUDE.md, .cursorrules, AGENTS.md, .windsurfrules, CONVENTIONS.md, AIDER_CONVENTIONS.md, or .clinerules found in repo root. If added later, surface notable rules here.

---

If this file already exists, consider merging the above updates into the existing doc rather than replacing it wholesale.

---

Would you like an MCP server configured (for example Playwright or a headless browser) to run end-to-end checks for this web project?