export interface LectureEntry {
  slug: string;
  title: string;
  summary: string;
}

// Ordered to mirror the app's own build order — each lecture leans on state
// (proof trees, evaluation, extensions) introduced by the ones before it.
export const LECTURE_REGISTRY: LectureEntry[] = [
  {
    slug: "stlc-basics",
    title: "STLC Basics",
    summary: "Terms, types, and the Γ ⊢ t : T judgement — the foundation everything else builds on.",
  },
  {
    slug: "typing-derivations",
    title: "Typing Derivations & Proof Trees",
    summary: "How a type-checking judgement is justified step by step, and how to read the Proof Tree panel.",
  },
  {
    slug: "evaluation",
    title: "Evaluation",
    summary: "Reducing terms to values, and the three evaluation strategies the app supports.",
  },
  {
    slug: "curry-howard",
    title: "Curry–Howard Correspondence",
    summary: "Reading a typing derivation as a natural-deduction proof — propositions as types, terms as proofs.",
  },
  {
    slug: "data-types",
    title: "Data Types",
    summary: "Sums, products, records, variants, and lists — building structured data on top of STLC.",
  },
  {
    slug: "iso-recursive-types",
    title: "Iso-recursive Types (μ)",
    summary: "Defining self-referential types with fold/unfold, and why they need an explicit isomorphism.",
  },
  {
    slug: "recursion",
    title: "Recursion (fix)",
    summary: "Writing recursive functions with the fixpoint operator instead of naming a function after itself.",
  },
  {
    slug: "let-polymorphism",
    title: "Let-polymorphism & Type Inference",
    summary: "Generalizing let-bound values so one definition can be reused at multiple types.",
  },
  {
    slug: "system-f",
    title: "System F",
    summary: "Explicit polymorphism via type abstraction and type application.",
  },
  {
    slug: "system-f-omega",
    title: "System Fω",
    summary: "Type constructors and kinds — types that take types as arguments.",
  },
  {
    slug: "system-lambda-p",
    title: "System λP (Dependent Types)",
    summary: "Types that depend on terms — dependent function types and term-indexed type families.",
  },
];
