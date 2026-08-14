// LaTeX source for each rule — rendered via MathJax in RuleCard.tsx, using the
// same conventions the app's own proof tree renderer uses (\text{} for
// keywords, \Gamma and a single ':' for both typing and kinding — see
// TexMapper.ts's kindProofTex for why there's no separate Δ or '::' here).
export interface RuleDefinition {
  id: string;
  premisesTex: string[];
  conclusionTex: string;
  description: string;
}

export interface RuleGroup {
  id: string;
  title: string;
  note?: string;
  rules: RuleDefinition[];
}

// Reference deck for the Rule Cards page. Grouped to mirror the lecture order
// (see lectureRegistry.ts) rather than the checker's internal Rule enum —
// several enum entries (the CT-* constraint-typing variants used internally
// for let-polymorphism) are collapsed into the single Gen/Inst pair below
// since they're the same underlying idea (generalize at let, instantiate at
// use) applied mechanically to every construct, not separate concepts.
export const RULE_GROUPS: RuleGroup[] = [
  {
    id: "stlc",
    title: "Simply Typed Lambda Calculus (STLC)",
    rules: [
      {
        id: "T-Var",
        premisesTex: ["x : T \\in \\Gamma"],
        conclusionTex: "\\Gamma \\vdash x : T",
        description: "A variable's type is whatever the context says it is.",
      },
      {
        id: "T-Abs",
        premisesTex: ["\\Gamma, x{:}T_1 \\vdash t_2 : T_2"],
        conclusionTex: "\\Gamma \\vdash \\lambda x{:}T_1.\\, t_2 : T_1 \\to T_2",
        description: "Check the body with the parameter added to the context; the result is a function type.",
      },
      {
        id: "T-App",
        premisesTex: ["\\Gamma \\vdash t_1 : T_1 \\to T_2", "\\Gamma \\vdash t_2 : T_1"],
        conclusionTex: "\\Gamma \\vdash t_1\\ t_2 : T_2",
        description: "The function's argument type must match the argument's actual type.",
      },
      {
        id: "T-Const",
        premisesTex: [],
        conclusionTex: "\\Gamma \\vdash c : \\mathit{type\\text{-}of}(c)",
        description: "Numerals are Nat, true/false are Bool, unit is Unit — no premises needed.",
      },
      {
        id: "T-If",
        premisesTex: ["\\Gamma \\vdash t_1 : \\text{Bool}", "\\Gamma \\vdash t_2 : T", "\\Gamma \\vdash t_3 : T"],
        conclusionTex: "\\Gamma \\vdash \\text{if}\\ t_1\\ \\text{then}\\ t_2\\ \\text{else}\\ t_3 : T",
        description: "Both branches must agree on a single result type.",
      },
      {
        id: "T-BinOp",
        premisesTex: ["\\Gamma \\vdash t_1 : \\text{Nat}", "\\Gamma \\vdash t_2 : \\text{Nat}"],
        conclusionTex: "\\Gamma \\vdash t_1\\ \\mathit{op}\\ t_2 : \\text{Nat}\\ (\\text{or}\\ \\text{Bool})",
        description: "+ - * / produce Nat; < > <= >= == != produce Bool.",
      },
      {
        id: "T-Let",
        premisesTex: ["\\Gamma \\vdash t_1 : T_1", "\\Gamma, x{:}T_1 \\vdash t_2 : T_2"],
        conclusionTex: "\\Gamma \\vdash \\text{let}\\ x = t_1\\ \\text{in}\\ t_2 : T_2",
        description: "Monomorphic let — x gets exactly one type, reused in the body. Compare with Gen/Inst below.",
      },
      {
        id: "T-Ascribe",
        premisesTex: ["\\Gamma \\vdash t : T"],
        conclusionTex: "\\Gamma \\vdash (t\\ \\text{as}\\ T) : T",
        description: "States the type explicitly; the checker still verifies it.",
      },
      {
        id: "T-Seq",
        premisesTex: ["\\Gamma \\vdash t_1 : \\text{Unit}", "\\Gamma \\vdash t_2 : T_2"],
        conclusionTex: "\\Gamma \\vdash t_1 ; t_2 : T_2",
        description: "t1 runs for its effect and must be Unit-typed; the result is t2's type.",
      },
    ],
  },
  {
    id: "evaluation",
    title: "Evaluation (small-step)",
    note: "One rule fires per reduction step — the Evaluation panel shows this sequence with the strategy of your choice.",
    rules: [
      {
        id: "E-AppAbs",
        premisesTex: ["v_2\\ \\text{is a value}"],
        conclusionTex: "(\\lambda x{:}T.\\, t_1)\\ v_2 \\to [x \\mapsto v_2]\\, t_1",
        description: "β-reduction — the redex at the heart of the whole calculus: substitute the argument into the body.",
      },
      {
        id: "E-App1",
        premisesTex: ["t_1 \\to t_1'"],
        conclusionTex: "t_1\\ t_2 \\to t_1'\\ t_2",
        description: "Reduce the function position first (call-by-value congruence).",
      },
      {
        id: "E-App2",
        premisesTex: ["v_1\\ \\text{is a value}", "t_2 \\to t_2'"],
        conclusionTex: "v_1\\ t_2 \\to v_1\\ t_2'",
        description: "Once the function is a value, reduce the argument.",
      },
      {
        id: "E-If",
        premisesTex: [],
        conclusionTex: "\\text{if}\\ \\text{true}\\ \\text{then}\\ t_2\\ \\text{else}\\ t_3 \\to t_2",
        description: "The condition must reduce to a boolean value before either branch is taken (symmetric rule for false → t3).",
      },
    ],
  },
  {
    id: "curry-howard",
    title: "Curry–Howard Correspondence",
    note: "The exact same derivation as STLC typing, relabeled as natural-deduction logic — a term is a proof, its type is the proposition it proves.",
    rules: [
      {
        id: "Ax",
        premisesTex: ["\\varphi \\in \\Gamma"],
        conclusionTex: "\\Gamma \\vdash \\varphi",
        description: "A hypothesis already in context proves itself — the logical reading of T-Var.",
      },
      {
        id: "⇒I",
        premisesTex: ["\\Gamma, \\varphi \\vdash \\psi"],
        conclusionTex: "\\Gamma \\vdash \\varphi \\Rightarrow \\psi",
        description: "Implication introduction — the logical reading of T-Abs.",
      },
      {
        id: "⇒E",
        premisesTex: ["\\Gamma \\vdash \\varphi \\Rightarrow \\psi", "\\Gamma \\vdash \\varphi"],
        conclusionTex: "\\Gamma \\vdash \\psi",
        description: "Modus ponens — the logical reading of T-App.",
      },
      {
        id: "∧I",
        premisesTex: ["\\Gamma \\vdash \\varphi", "\\Gamma \\vdash \\psi"],
        conclusionTex: "\\Gamma \\vdash \\varphi \\wedge \\psi",
        description: "Conjunction introduction — the logical reading of tuple construction.",
      },
      {
        id: "∨I",
        premisesTex: ["\\Gamma \\vdash \\varphi"],
        conclusionTex: "\\Gamma \\vdash \\varphi \\vee \\psi",
        description: "Disjunction introduction — the logical reading of inl/inr.",
      },
    ],
  },
  {
    id: "data-types",
    title: "Data Types",
    rules: [
      {
        id: "T-Inl / T-Inr",
        premisesTex: ["\\Gamma \\vdash t_1 : T_1\\ (\\text{or}\\ T_2)"],
        conclusionTex: "\\Gamma \\vdash \\text{inl}\\ t_1\\ \\text{as}\\ T_1{+}T_2 : T_1+T_2",
        description: "Inject into either side of a sum type; the ascription pins down the other side.",
      },
      {
        id: "T-Case",
        premisesTex: ["\\Gamma \\vdash t_0 : T_1{+}T_2", "\\Gamma, x_1{:}T_1 \\vdash t_1 : T", "\\Gamma, x_2{:}T_2 \\vdash t_2 : T"],
        conclusionTex: "\\Gamma \\vdash \\text{case}\\ t_0\\ \\text{of}\\ \\text{inl}\\ x_1{\\Rightarrow}t_1\\ |\\ \\text{inr}\\ x_2{\\Rightarrow}t_2 : T",
        description: "Both branches must agree on a result type, just like T-If.",
      },
      {
        id: "T-Tuple / T-Record",
        premisesTex: ["\\Gamma \\vdash t_i : T_i\\ \\text{for each component/field}"],
        conclusionTex: "\\Gamma \\vdash \\langle t_1,\\ldots,t_n\\rangle : \\langle T_1{*}\\cdots{*}T_n\\rangle",
        description: "Every component is checked independently and the types are collected positionally (tuple) or by label (record).",
      },
      {
        id: "T-Proj",
        premisesTex: ["\\Gamma \\vdash t : \\langle \\ldots \\rangle"],
        conclusionTex: "\\Gamma \\vdash t.i : T_i \\quad / \\quad \\Gamma \\vdash t.l : T",
        description: "Projection just looks up the component's already-known type.",
      },
      {
        id: "T-Variant / T-VariantCase",
        premisesTex: ["\\Gamma \\vdash t_i : T_i\\ \\text{for the chosen label}"],
        conclusionTex: "\\Gamma \\vdash [l_i{=}t_i]\\ \\text{as}\\ [l_1{:}T_1,\\ldots] : [l_1{:}T_1,\\ldots]",
        description: "The n-ary generalization of inl/inr/case, with labels instead of left/right.",
      },
      {
        id: "T-Nil / T-Cons",
        premisesTex: ["\\Gamma \\vdash t_1 : T\\ (\\text{Cons only})", "\\Gamma \\vdash t_2 : \\text{List}\\ T\\ (\\text{Cons only})"],
        conclusionTex: "\\Gamma \\vdash \\text{cons}[T]\\ t_1\\ t_2 : \\text{List}\\ T",
        description: "nil[T] is the empty list of a given element type; cons prepends one element.",
      },
      {
        id: "T-IsNil / T-Head / T-Tail",
        premisesTex: ["\\Gamma \\vdash t : \\text{List}\\ T"],
        conclusionTex: "\\text{isnil}[T]\\,t : \\text{Bool} \\ \\ /\\ \\ \\text{head}[T]\\,t : T \\ \\ /\\ \\ \\text{tail}[T]\\,t : \\text{List}\\ T",
        description: "The three list eliminators, all requiring the element type annotation used at construction.",
      },
    ],
  },
  {
    id: "iso-recursive",
    title: "Iso-recursive Types (μ)",
    note: "μX.T and its one-step unfolding [X ↦ μX.T]T are isomorphic, not equal — fold/unfold are the two directions of that isomorphism, made explicit as terms.",
    rules: [
      {
        id: "T-Fold",
        premisesTex: ["\\Gamma \\vdash t : [X \\mapsto \\mu X. T]\\, T"],
        conclusionTex: "\\Gamma \\vdash \\text{fold}[\\mu X. T]\\ t : \\mu X. T",
        description: "Roll an unfolded value up into the recursive type.",
      },
      {
        id: "T-Unfold",
        premisesTex: ["\\Gamma \\vdash t : \\mu X. T"],
        conclusionTex: "\\Gamma \\vdash \\text{unfold}[\\mu X. T]\\ t : [X \\mapsto \\mu X. T]\\, T",
        description: "Unroll a recursive value by one layer to inspect it.",
      },
    ],
  },
  {
    id: "recursion",
    title: "Recursion (fix)",
    rules: [
      {
        id: "T-Fix",
        premisesTex: ["\\Gamma \\vdash t_1 : T \\to T"],
        conclusionTex: "\\Gamma \\vdash \\text{fix}\\ t_1 : T",
        description: "fix ties the recursive knot without the function needing to refer to its own name.",
      },
      {
        id: "E-FixBeta",
        premisesTex: [],
        conclusionTex: "\\text{fix}\\ (\\lambda x{:}T.\\, t_2) \\to [x \\mapsto \\text{fix}\\ (\\lambda x{:}T.\\, t_2)]\\, t_2",
        description: "Unfolds one layer of recursion, substituting the whole fix expression back in for the recursive call.",
      },
    ],
  },
  {
    id: "let-polymorphism",
    title: "Let-polymorphism & Type Inference",
    note: "The app derives these via constraint generation + unification — watch for CT-* rules firing in the Proof Tree once this theory is enabled.",
    rules: [
      {
        id: "Gen",
        premisesTex: ["\\Gamma \\vdash t_1 : T", "X_1,\\ldots,X_n = \\mathit{ftv}(T) \\setminus \\mathit{ftv}(\\Gamma)"],
        conclusionTex: "\\mathit{generalize}(T,\\Gamma) = \\forall X_1\\ldots X_n. T",
        description: "At a let-binding, quantify over every type variable that's still free — those weren't pinned down by the context.",
      },
      {
        id: "Inst",
        premisesTex: ["x : \\forall X. T \\in \\Gamma"],
        conclusionTex: "\\Gamma \\vdash x : [X \\mapsto S]\\, T",
        description: "Every use of a polymorphic binding can instantiate its quantified variables independently.",
      },
    ],
  },
  {
    id: "system-f",
    title: "System F",
    rules: [
      {
        id: "T-TAbs",
        premisesTex: ["\\Gamma \\vdash t : T\\ \\ (X \\notin \\mathit{ftv}(\\Gamma))"],
        conclusionTex: "\\Gamma \\vdash \\Lambda X.\\, t : \\forall X. T",
        description: "Abstract over a type variable — X must be genuinely fresh, not already constrained by the context.",
      },
      {
        id: "T-TApp",
        premisesTex: ["\\Gamma \\vdash t : \\forall X. T_2"],
        conclusionTex: "\\Gamma \\vdash t\\,[T_1] : [X \\mapsto T_1]\\, T_2",
        description: "Instantiate a polymorphic term at a chosen type, explicitly — unlike let-polymorphism, always written out.",
      },
    ],
  },
  {
    id: "system-f-omega",
    title: "System Fω — Kinding",
    note: "Kinds classify types the way types classify terms. @ (\"star\") is the kind of ordinary types. The app renders kinding with the same Γ and the same single ':' as term typing — there's no separate Δ or '::' here.",
    rules: [
      {
        id: "K-Base",
        premisesTex: [],
        conclusionTex: "\\Gamma \\vdash T : @",
        description: "Nat, Bool, Unit, and any type variable of kind @ are already well-kinded.",
      },
      {
        id: "K-Form",
        premisesTex: ["\\Gamma \\vdash T_1 : @", "\\Gamma \\vdash T_2 : @"],
        conclusionTex: "\\Gamma \\vdash T_1 \\to T_2 : @",
        description: "Arrow (and sum/tuple/etc.) types are well-kinded when both sides are.",
      },
      {
        id: "K-Abs",
        premisesTex: ["\\Gamma, X{:}K_1 \\vdash T_2 : K_2"],
        conclusionTex: "\\Gamma \\vdash \\lambda X{:}K_1.\\, T_2 : K_1 \\to K_2",
        description: "A type constructor's kind is an arrow, just like a term function's type.",
      },
      {
        id: "K-App",
        premisesTex: ["\\Gamma \\vdash T_1 : K_1 \\to K_2", "\\Gamma \\vdash T_2 : K_1"],
        conclusionTex: "\\Gamma \\vdash T_1\\ T_2 : K_2",
        description: "Applying a type constructor to a type argument — mirrors T-App one level up.",
      },
    ],
  },
  {
    id: "system-lambda-p",
    title: "System λP (Dependent Types)",
    note: "The result type of a Π-typed function may mention the argument itself — that's what makes it dependent.",
    rules: [
      {
        id: "K-Pi",
        premisesTex: ["\\Gamma \\vdash A : @", "\\Gamma, x{:}A \\vdash B : @"],
        conclusionTex: "\\Gamma \\vdash \\Pi x{:}A.\\, B : @",
        description: "A dependent function type is well-kinded when its result kind stays @ with x bound to A.",
      },
      {
        id: "T-PiApp",
        premisesTex: ["\\Gamma \\vdash t_1 : \\Pi x{:}A.\\, B", "\\Gamma \\vdash t_2 : A"],
        conclusionTex: "\\Gamma \\vdash t_1\\ t_2 : [x \\mapsto t_2]\\, B",
        description: "Unlike plain T-App, the argument gets substituted into the *result type*, not just consumed.",
      },
      {
        id: "K-IndexApp",
        premisesTex: ["\\Gamma \\vdash F : (A \\to K)", "\\Gamma \\vdash t : A"],
        conclusionTex: "\\Gamma \\vdash F[t] : [x \\mapsto t]\\, K",
        description: "Indexing a term-parameterized type family (e.g. Vec[n]) by an actual term.",
      },
      {
        id: "Conv",
        premisesTex: ["\\Gamma \\vdash t : T", "T \\equiv T'"],
        conclusionTex: "\\Gamma \\vdash t : T'",
        description: "If two types are equal after reduction (e.g. Vec[2+1] ≡ Vec[3]), a term of one has the other too.",
      },
    ],
  },
];
