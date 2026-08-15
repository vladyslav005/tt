import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Link} from "react-router-dom";
import {
  Callout,
  ConceptSection,
  GrammarBox,
  PipelineDiagram,
  ReferenceList,
  RuleAnatomy,
  RuleCardStrip,
  SectionHeading,
  SummaryBox,
  TableOfContents,
  TryItBox,
  type TocItem,
} from "@/features/docs/lectures/blocks/LectureBlocks.tsx";
import {MiniWorkspace} from "@/features/docs/workspace/MiniWorkspace.tsx";
import {PredictThenVerify} from "@/features/docs/workspace/PredictThenVerify.tsx";
import {AstBuilder} from "@/features/docs/workspace/AstBuilder.tsx";
import {ReductionStrategyExplorer} from "@/features/docs/workspace/ReductionStrategyExplorer.tsx";

const staggerContainer = {animate: {transition: {staggerChildren: 0.08}}};

const STLC_BASICS_GRAMMAR = `term ::= ID                                     (* variable *)
       | 'λ' ID ':' type '.' term               (* abstraction *)
       | term term                              (* application *)
       | term ('+'|'-'|'*'|'/') term             (* arithmetic *)
       | 'if' term 'then' term 'else' term
       | 'true' | 'false' | natural-number
       | '(' term ')'

type ::= ID | 'Bool' | 'Nat' | type '->' type          (* right-associative *)`;

// typeVar is included only because param type is a connectable node, not an inline field.
const STLC_BASICS_AST_TYPES = ["abstraction", "application", "variable", "literal", "typeVar"];

const STLC_BASICS_OUTLINE: TocItem[] = [
  {
    id: "why-any-of-this", label: "Why any of this?",
    subitems: [
      {id: "what-is-stlc", label: "What is STLC?"},
      {id: "types-and-grammars", label: "Types & grammars"},
      {id: "where-this-comes-from", label: "Where this comes from"},
      {id: "where-youll-see-this-again", label: "Where you'll see this again"},
    ],
  },
  {
    id: "syntax", label: "Syntax",
    subitems: [
      {id: "terms", label: "Terms"},
      {id: "the-arrow", label: "The arrow"},
      {id: "text-to-tree", label: "From text to tree"},
      {id: "free-bound", label: "Free vs. bound"},
      {id: "alpha-equivalence", label: "α-equivalence"},
    ],
  },
  {
    id: "typing", label: "Typing",
    subitems: [
      {id: "why-bother", label: "Why bother?"},
      {id: "how-to-read-a-rule", label: "Reading a rule"},
    ],
  },
  {
    id: "semantics", label: "Semantics",
    subitems: [
      {id: "math-functions", label: "Math notation"},
      {id: "substitution", label: "Substitution"},
      {id: "evaluation-rule-meaning", label: "Evaluation rules"},
      {id: "evaluation-strategies", label: "Strategies"},
      {id: "non-termination", label: "Non-termination"},
      {id: "church-rosser", label: "Church–Rosser"},
    ],
  },
  {id: "summary", label: "Summary"},
  {id: "sources", label: "Sources"},
];

export function StlcBasicsLecture() {
  return (
    <div className="xl:flex xl:gap-8">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="space-y-12 min-w-0 flex-1"
      >
        <motion.p variants={fadeInUp} className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Three questions carry this whole lecture: what does a term look like, does it make sense,
          and what does it do when it runs? That's syntax, typing, and semantics — the same three
          questions every language in this app (and this course) answers, just with more machinery
          added lecture by lecture.
        </motion.p>

        {/* ------------------------------------------------------------ MOTIVATION ---------- */}
        <motion.div variants={fadeInUp}>
          <SectionHeading id="why-any-of-this" index="0" title="Why any of this?" blurb="A minute of context before the formalism starts."/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="what-is-stlc" title="What does &quot;STLC&quot; even mean?">
            <p>
              STLC stands for <strong>Simply Typed Lambda Calculus</strong> — three words, three
              ideas, read right to left:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Lambda calculus</strong> is the tiny language of functions this whole
                course is built on. <code>λ</code> is just the Greek letter Alonzo Church picked, in
                the 1930s, to mean "here comes a function."</li>
              <li><strong>Typed</strong> means every piece of the program has to have one specific,
                checked-in-advance type — never a guess, never "we'll find out at runtime."</li>
              <li><strong>Simply</strong> means the smallest useful version of "typed": no
                generics, no advanced tricks. Just enough to be real. Everything fancier
                (lectures 5–11) gets added on top, one idea at a time.</li>
            </ul>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="types-and-grammars" title="Types and grammars, in plain terms">
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                A <strong>type</strong> is a promise about a value: "this is a <code>Bool</code>"
                means it's always <code>true</code> or <code>false</code>, never accidentally a
                number. <strong>Type-checking</strong> is just mechanically verifying every promise
                in a program is kept — before any of it runs.
              </li>
              <li>
                A <strong>grammar</strong> is a rulebook for what counts as a valid sentence — same
                idea as "the cat sat" being fine in English but "cat the sat" not. This lecture's
                grammar does that for terms: it decides which strings of symbols are even worth
                asking a type about.
              </li>
            </ul>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="where-this-comes-from" title="Where this comes from">
            <p>
              In 1901, Bertrand Russell found a contradiction sitting inside the foundations of
              mathematics itself — a single sentence that was both true and false. It sent
              mathematicians looking for a stricter answer to a question that suddenly seemed
              urgent: what, exactly, counts as a valid computation?
            </p>
            <p>
              Three people answered, independently, within a few years of each other — Kurt Gödel,
              Alan Turing, and Alonzo Church, who happened to be Turing's own doctoral advisor.
              Church's answer was a small notation for functions: the λ-calculus. All three turned
              out to define the exact same thing, and Church's is the one TT builds on.
            </p>
            <p>
              That's not just trivia. The question TT keeps asking, lecture after lecture — "does
              this term make sense?" — is the same one TypeScript, Rust, or Java answers before your
              code ever runs. Learn to answer it by hand, and a type error stops looking like a wall
              and starts looking like a rule you can point to.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="where-youll-see-this-again" title="Where you'll see this again">
            <p>
              Every statically-typed language you've used already runs a version of what TT
              teaches — usually hidden behind a compiler. A handful of ideas worth naming now,
              since you've likely met them already without the name:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Type inference</strong> — TypeScript, Rust, and Kotlin guessing a type
                you didn't write — is the Γ ⊢ t : T judgement, solved automatically instead of
                checked against an annotation (lecture 8).</li>
              <li><strong>Generics</strong>, <code>&lt;T&gt;</code> in Java, TypeScript, or Rust,
                are explicit polymorphism (lecture 9) with friendlier syntax.</li>
              <li><strong>Option/Result</strong> types — the reason modern languages don't crash on
                null — are sum types (lecture 5) doing real work.</li>
            </ul>
            <p>None of it needs memorizing here — just recognizing later, once you've seen the mechanism underneath it.</p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <PipelineDiagram
            steps={[
              {label: "Source text", detail: "what you type"},
              {label: "AST", detail: "parsed shape"},
              {label: "Γ ⊢ t : T", detail: "does it typecheck?"},
              {label: "Value", detail: "what it runs to"},
            ]}
          />
        </motion.div>

        {/* ---------------------------------------------------------------- SYNTAX ---------- */}
        <motion.div variants={fadeInUp}>
          <SectionHeading id="syntax" index="1" title="Syntax" blurb="What does a term look like, and what's its shape underneath?"/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="terms" title="Terms">
            <p>
              A <strong>term</strong> is just one piece of program text — think of it like a single
              LEGO brick, or one ingredient in a recipe. On its own it's already a well-formed
              piece; you build a whole program by snapping terms together. <code>5</code>,{" "}
              <code>true</code>, and <code>x</code> are all terms by themselves; so is a whole
              function like <code>λx:Bool. x</code>.
            </p>
            <p>Every term the app understands is built from just four shapes:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><code>x</code> — a <strong>variable</strong>, standing for whatever it's bound to.</li>
              <li><code>λx:T. t</code> — an <strong>abstraction</strong>: a function with parameter
                <code>x</code> of type <code>T</code> and body <code>t</code>.</li>
              <li><code>t u</code> — an <strong>application</strong>: term <code>t</code> called with
                argument <code>u</code>. No symbol for "call" — you just write the two terms next
                to each other, with a space between. Chain three terms and it groups from the
                left, so <code>t u v</code> means <code>(t u) v</code> — call <code>t</code> with{" "}
                <code>u</code> first, then call whatever that gives back with <code>v</code>.</li>
              <li><code>true</code>, <code>false</code>, numerals, and <code>if ... then ... else</code> —
                a small set of <strong>constants</strong> to actually compute with.</li>
            </ul>
            <p>
              That's it — everything in later lectures (tuples, lists, recursive types,
              polymorphism...) is more shapes added on top of these four. The full grammar always
              lives on the <a href="/docs/grammar" className="text-primary hover:underline">Grammar &amp; Symbols</a> page;
              below is just the slice this lecture uses.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="the-arrow" title="The arrow: how a function's type is written">
            <p>
              <code>λx:T1. t2</code>'s type is written <code>T1 -&gt; T2</code> — "a function that
              takes a <code>T1</code> and gives back a <code>T2</code>". Think of it like a vending
              machine slot: put in exactly a <code>T1</code> (the right coin), and you're
              guaranteed a <code>T2</code> back, no matter what happens inside.
            </p>
            <p>
              <code>-&gt;</code> is <strong>right-associative</strong>, so{" "}
              <code>T1 -&gt; T2 -&gt; T3</code> means <code>T1 -&gt; (T2 -&gt; T3)</code> — "a
              function that takes a <code>T1</code> and hands back <em>another function</em>, from{" "}
              <code>T2</code> to <code>T3</code>". That's exactly what a multi-parameter function
              looks like once it's written as nested single-parameter abstractions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><code>λ x : Bool . λ y : Bool . x</code> has type{" "}
                <code>Bool -&gt; Bool -&gt; Bool</code>, i.e.{" "}
                <code>Bool -&gt; (Bool -&gt; Bool)</code> — give it one <code>Bool</code>, get back
                a function still waiting for the second one.</li>
            </ul>
            <p>
              Each arrow peels off exactly one argument — the same trick every curried function in
              TS, Haskell, or Rust is built from.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <GrammarBox grammar={STLC_BASICS_GRAMMAR}/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Callout title="The app, alongside this page">
            Everything here pairs with the real thing — open <strong>Editor</strong> in the top
            nav to follow along. It's one screen: a text editor on the left, and panels on the
            right (<strong>AST</strong>, <strong>Proof Tree</strong>, <strong>Evaluation</strong>)
            that update live as you type. This lecture introduces each panel one at a time, right
            where it becomes relevant.
          </Callout>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="text-to-tree" title="From text to tree">
            <p>
              What you type is <strong>concrete syntax</strong> — characters, spacing,
              parentheses. What the parser hands to the typechecker and evaluator is{" "}
              <strong>abstract syntax</strong>: a tree with the formatting stripped away, keeping
              only the shape. <code>(λ x : Bool . x) true</code> becomes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>an <strong>application</strong> node, whose two children are —</li>
              <li>an <strong>abstraction</strong> node (parameter <code>x</code>, type{" "}
                <code>Bool</code>, body <code>x</code>), and</li>
              <li>a <strong>literal</strong> node (<code>true</code>).</li>
            </ul>
            <p>
              Every rule from here on — typing rules, evaluation rules — is defined by matching on
              this tree shape, not on the source text. The app's <strong>AST</strong> panel shows
              you this tree live for whatever you type; try building the same tree by hand below,
              using only the pieces introduced so far.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <AstBuilder
            allowedTypes={STLC_BASICS_AST_TYPES}
            instructions={
              "Construct (λ x : Bool . x) true: an Application, whose two children are an " +
              "Abstraction (param x : Bool, body a Variable x) and a Bool Literal (true). The " +
              "palette below only offers what this lecture has covered — no jumping ahead."
            }
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="free-bound" title="Names: free vs. bound">
            <p>
              A variable occurrence is <strong>bound</strong> if it's inside the body of a{" "}
              <code>λ</code> that introduces it, and <strong>free</strong> otherwise:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><code>λx:Bool. x</code> — <code>x</code> is bound (by the outer <code>λx</code>).</li>
              <li><code>λx:Bool. y</code> — <code>y</code> is free; nothing in the term binds it, so
                its meaning must come from outside (the context, Γ — covered in the next section).</li>
              <li><code>λx:Bool. λy:Bool. x</code> — <code>x</code> is bound by the outer{" "}
                <code>λ</code>, <code>y</code> by the inner one. Both are bound; nothing is free.</li>
            </ul>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="alpha-equivalence" title="α-equivalence: names don't matter, bindings do">
            <p>
              A bound variable is just a placeholder for "whatever gets passed in" — renaming it
              consistently throughout a term changes nothing about what it means:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><code>λx:Bool. x</code> and <code>λy:Bool. y</code> — the <em>same</em> function,
                just spelled with a different parameter name. This is <strong>α-equivalence</strong>.</li>
              <li><code>λx:Bool. y</code> and <code>λx:Bool. z</code> — genuinely{" "}
                <em>different</em> terms, since <code>y</code> and <code>z</code> are free and refer
                to two different things outside the term.</li>
            </ul>
            <p>The rule of thumb: only which occurrences are bound <em>together</em> is meaningful — the label itself never is.</p>
          </ConceptSection>
        </motion.div>

        {/* ---------------------------------------------------------------- TYPING ---------- */}
        <motion.div variants={fadeInUp}>
          <SectionHeading id="typing" index="2" title="Typing" blurb="Given the shape above, does this particular term make sense?"/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="why-bother" title="Why bother?">
            <p>
              The grammar above doesn't stop you from writing nonsense — applying a boolean as if
              it were a function is syntactically fine, it just doesn't mean anything. Left alone,
              a term like that gets <strong>stuck</strong> during evaluation: not a value, but no
              rule applies to it either.
            </p>
            <p>
              Typing catches this <em>before</em> anything runs, by answering one question for
              every subterm: given what's in scope, does this make sense, and what does it produce?
              That question has a name — the <strong>typing judgement</strong>:
            </p>
            <p className="text-center py-2 text-base text-foreground"><code>Γ ⊢ t : T</code></p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Read it as "under context Γ, term <code>t</code> has type <code>T</code>".</li>
              <li><code>Γ</code> (capital gamma) is the <strong>context</strong> — think of it as
                the list of parameters currently in scope, each paired with its type, the same way
                a function signature tells you what's available inside its body.</li>
              <li>A closed term (no free variables) can be checked against the empty context; a
                term with free variables needs Γ to say what they are.</li>
            </ul>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="how-to-read-a-rule" title="How to read a typing rule">
            <p>
              A rule is a recipe: a short list of things that must already be true — the{" "}
              <strong>premises</strong>, above the line — and what follows if they are — the{" "}
              <strong>conclusion</strong>, below it. No premises at all just means "always true".
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <RuleAnatomy/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Five such rules cover everything this lecture's grammar can express — one per term
            shape, plus the constants:
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <RuleCardStrip ruleIds={["T-Var", "T-Abs", "T-App", "T-If"]}/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Callout title="Examples, and staying in plain STLC">
            The <strong>Examples</strong> dropdown in the top bar has pre-written terms if you'd
            rather load one than type it. Next to it, <strong>Type System Extensions</strong> lets
            you turn on later lectures' features (polymorphism, recursive types, dependent
            types...) — leave everything off for now. This lecture only needs plain STLC.
          </Callout>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <TryItBox
            steps={[
              <>Open the <strong>Editor</strong> and clear it, then type <code>(λ x : Bool . x) true;</code>.</>,
              <>Look at the <strong>AST</strong> panel — the same application/abstraction/literal
                shape you just built by hand.</>,
              <>Switch to the <strong>Proof Tree</strong> panel — it's the Γ ⊢ t : T judgement built
                live, one rule per node, matching the T-App/T-Abs/T-Var/T-Const cards above.</>,
              <>Break it on purpose: change <code>true</code> to <code>5</code>. T-App's premise
                that the argument's type matches the parameter's type now fails, and the error
                shows exactly where.</>,
            ]}
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Same idea, without leaving this page — edit the term and check its type:
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <MiniWorkspace
            initialTerm={"(λ x : Bool . x) true;"}
            hint="Try replacing `true` with a number, or dropping the argument entirely, and see which rule's premise breaks."
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <PredictThenVerify
            term={"λ f : Bool -> Bool . λ x : Bool . f x;"}
            prompt="Checkpoint: this function takes another function and a Bool. Work out its type before revealing — T-Abs applied twice, from the inside out."
          />
        </motion.div>

        {/* -------------------------------------------------------------- SEMANTICS ---------- */}
        <motion.div variants={fadeInUp}>
          <SectionHeading id="semantics" index="3" title="Semantics" blurb="The term type-checks — now what does it actually do when it runs?"/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="math-functions" title="The same idea as ordinary functions">
            <p>Ordinary function notation and λ-notation say the same thing two ways:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Math: <code>f(x) = x + 1</code>, then <code>f(3) = 4</code>.</li>
              <li>The app: <code>f = λ x : Nat . x + 1 : Nat -&gt; Nat</code>, then{" "}
                <code>f 3</code> reduces to <code>4</code>.</li>
            </ul>
            <p>
              "Calling <code>f</code> with <code>3</code>" and "replacing <code>x</code> with{" "}
              <code>3</code> throughout the body" are the same operation. That replacement has a
              name — <strong>β-reduction</strong> — and, unlike the informal math version, it's
              defined precisely enough for a computer to carry out.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="substitution" title="Substitution, precisely">
            <p>
              <strong>Substitution</strong> is a fancy name for a simple idea: find-and-replace,
              like in a text editor — swap every occurrence of one thing for another. Written{" "}
              <code>[x ↦ v]t</code>, it means "<code>t</code>, with every free occurrence of{" "}
              <code>x</code> replaced by <code>v</code>". It's defined by recursing over{" "}
              <code>t</code>'s shape — the same four shapes from the Syntax section:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-mono text-xs">
              <li><code>[x ↦ v] x = v</code></li>
              <li><code>[x ↦ v] y = y</code>, if <code>y ≠ x</code> — leaves other variables alone.</li>
              <li><code>[x ↦ v] (λy:T. t) = λy:T. [x ↦ v] t</code>, if <code>y ≠ x</code> — recurses
                into the body, as long as the inner binder doesn't shadow <code>x</code>.</li>
              <li><code>[x ↦ v] (t₁ t₂) = ([x ↦ v] t₁) ([x ↦ v] t₂)</code> — recurses into both
                sides of an application.</li>
            </ul>
            <p>β-reduction is exactly one application of this: <code>(λx:T. t) v → [x ↦ v] t</code>. For example:</p>
            <p className="text-center py-2 text-base text-foreground">
              <code>(λ x : Nat . x + 1) 3 → 3 + 1 → 4</code>
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="evaluation-rule-meaning" title="What an evaluation rule means">
            <p>
              Typing rules ask "does this make sense"; evaluation rules ask "what happens next".
              Each one is a <strong>rewrite</strong>: this exact shape becomes that shape, in one
              step — like a single line of arithmetic, <code>2 + 2 → 4</code>. The arrow always
              means "reduces to in one step", never "equals".
            </p>
            <p>
              One more word shows up in the rules below: a <strong>value</strong> is just a
              term that's already finished — nothing left to reduce. <code>true</code>,{" "}
              <code>5</code>, and any unapplied function like <code>λx:Bool. x</code> are values;{" "}
              <code>3 + 1</code> is not — it can still be reduced, to <code>4</code>.
            </p>
            <p>
              Two more rules round things out: reduce the function position first if it isn't a
              value yet, then — once it is — reduce the argument. Together, these three rules fully
              determine how any application runs:
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <RuleCardStrip ruleIds={["E-AppAbs", "E-App1", "E-App2"]}/>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Callout title="The Evaluation panel">
            Back in the app, the <strong>Evaluation</strong> panel has its own strategy dropdown, a{" "}
            <strong>Step</strong>/<strong>All</strong> toggle to walk through one reduction at a
            time or see the whole trace at once, and a <strong>Γ context</strong> switch that shows
            any global <code>let</code>/function declarations in scope alongside each step.
          </Callout>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="evaluation-strategies" title="Evaluation strategies: which redex first?">
            <p>
              A term can contain more than one reducible expression ("redex") at once — the rules
              above don't say which one goes first. A <strong>strategy</strong> does. The app
              supports three:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Call by value</strong> (the default) — reduce an argument to a value{" "}
                <em>before</em> substituting it in. What most real languages do.</li>
              <li><strong>Call by name</strong> — substitute the argument in unevaluated, and only
                reduce it once/if it's actually used. Never reduces under a <code>λ</code>.</li>
              <li><strong>Normal order</strong> — always reduce the leftmost, outermost redex first,
                including under a <code>λ</code>.</li>
            </ul>
            <p>
              The choice is observable: if a parameter is used more than once in the body,
              call-by-name substitutes the unevaluated argument at <em>every</em> use and
              re-reduces it each time, while call-by-value reduces it once, up front. Try the term
              below under each strategy and compare the step counts:
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ReductionStrategyExplorer
            term={"(λ x : Nat . x + x) ((λ y : Nat . y + 1) 3);"}
            hint="x is used twice in the body — watch how many times the inner (λy:Nat.y+1) 3 gets reduced under each strategy."
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="non-termination" title="When evaluation never stops">
            <p>
              So far, every strategy just took a different <em>number</em> of steps to reach the
              same answer. But not every term reaches an answer at all — some loop forever. Take
              the untyped term <code>ω = λx. x x</code> — "a function that calls its argument on
              itself" — and apply it to itself: <code>ω ω</code>. Substituting gives back{" "}
              <code>ω ω</code> again. And again. Forever.
            </p>
            <p>
              Try to give <code>x x</code> a type in this lecture's language, though, and you get
              stuck: <code>x</code> would need to be some type <code>T</code>{" "}
              <em>and</em> a function <code>T -&gt; T2</code> at the same time — plain STLC has no
              such type, so it never type-checks. That's not a coincidence — it's a real theorem,{" "}
              <strong>strong normalization</strong>: every well-typed STLC term is guaranteed to
              finish. (Lecture 7 reopens the door to loops on purpose, with a new construct,{" "}
              <code>fix</code> — exactly because plain STLC can't do it by itself.)
            </p>
            <p>
              Termination can even depend on the strategy: <code>(λx. y) ω ω</code> — a function
              that ignores its argument and always returns <code>y</code>. Under call by name,{" "}
              <code>y</code> comes back immediately, since the argument is never touched. Under
              call by value, the argument is reduced <em>first</em>, before the function ever
              runs — and since <code>ω ω</code> never finishes, neither does this.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ConceptSection id="church-rosser" title="Does the order ever change the answer?">
            <p>
              Strategies can disagree on speed, and — as above — on whether they finish at all. But
              when two of them <em>do</em> both finish, they can never disagree on the result. That
              guarantee is the <strong>Church–Rosser theorem</strong>: however many different valid
              paths a term has, any two that reach a value reach the <em>same</em> value. Pick any
              legal order of reductions you like — the answer, if there is one, was never in doubt.
            </p>
          </ConceptSection>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <SummaryBox
            id="summary"
            points={[
              {label: "Syntax", detail: "a term is a variable, an abstraction, an application, or a constant — abstract syntax trees, free/bound names, α-equivalence."},
              {label: "Typing", detail: "Γ ⊢ t : T asks whether a term makes sense; five rules cover every shape this lecture's grammar allows."},
              {label: "Semantics", detail: "β-reduction runs a term step by step; the strategy picks the order, but Church–Rosser guarantees the answer never changes."},
            ]}
            next={
              <>
                Next up — <Link to="/docs/typing-derivations" className="text-primary hover:underline">Typing Derivations &amp; Proof Trees</Link>{" "}
                — turning the Γ ⊢ t : T judgement above into the full derivation the Proof Tree panel builds.
              </>
            }
          />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <ReferenceList
            id="sources"
            entries={[
              {
                label: "TUKE Type Theory course — Lecture 1 (Introduction, NBL, Lambda Calculus)",
                href: "https://kurzy.kpi.fei.tuke.sk/tt/lectures/01.html#:~:text=%2D-,kalkul,-Je%20univerz%C3%A1lny%20form%C3%A1lny,",
              },
              {
                label: "Pierce, B. C. — Types and Programming Languages (MIT Press, 2002)",
                href: "https://www.cis.upenn.edu/~bcpierce/tapl/",
              },
            ]}
          />
        </motion.div>
      </motion.div>

      <TableOfContents items={STLC_BASICS_OUTLINE}/>
    </div>
  );
}
