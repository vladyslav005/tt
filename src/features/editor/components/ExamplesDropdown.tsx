import { BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface Example {
  label: string;
  description: string;
  code: string;
}

interface ExampleGroup {
  title: string;
  items: Example[];
}

const EXAMPLE_GROUPS: ExampleGroup[] = [
  {
    title: "Basics",
    items: [
      {
        label: "Identity",
        description: "Identity function",
        code: "a : T;\n(λ x : T . x) a;",
      },
      {
        label: "Type Alias",
        description: "typedef X = T introduces a transparent synonym, usable anywhere T could be",
        code: `typedef MyNat = Nat;

f = λ x : MyNat . x + 1 : MyNat -> MyNat;

f 5;`,
      },
      {
        label: "Type Alias: Chained",
        description: "a typedef built from an earlier typedef resolves through the whole chain to Nat",
        code: `typedef Id = Nat;
typedef Score = Id;

s : Score;
s + 10;`,
      },
      {
        label: "Type Alias: Function Type",
        description: "aliasing a compound (arrow) type to shorten a repeated signature",
        code: `typedef IntFn = Nat -> Nat;

apply = λ f : IntFn . λ x : Nat . f x : IntFn -> Nat -> Nat;

inc = λ x : Nat . x + 1 : Nat -> Nat;

apply inc 5;`,
      },
      {
        label: "Example 1",
        description: "Application chain",
        code: `identity = λ x : T . x : T -> T;

compose =
  λ f : T -> T .
  λ g : T -> T .
  λ x : T .
    f (g x)
  : (T -> T) -> (T -> T) -> T -> T;

twice =
  λ f : T -> T .
  λ x : T .
    f (f x)
  : (T -> T) -> T -> T;

twice ((compose identity) identity);`,
      },
      {
        label: "Example 2",
        description: "Alpha conversion",
        code: `y: T; (λ x : T . λ y : T . x) y;`,
      },
      {
        label: "Booleans & If",
        description: "if/then/elseif/else over Bool",
        code: `(if false then 100 elseif true then 200 else 300);`,
      },
      {
        label: "Ascription & Sequencing",
        description: "t1 : Unit ; t2, then ascribed",
        code: `((unit; 42) as Nat);`,
      },
      {
        label: "Dummy Abstraction",
        description: "λ_:T.t discards its argument",
        code: `((λ _ : Nat . true) 5);`,
      },
      {
        label: "Arithmetic",
        description: "+ - * / over Nat (all one precedence level, so group with parens)",
        code: `((2 + 3) * 4 - 1) / 3;`,
      },
      {
        label: "Comparison",
        description: "< <= > >= == != over Nat, producing Bool",
        code: `if (2 + 3) >= 5 then (10 == 10) else (10 != 10);`,
      },
    ],
  },
  {
    title: "Sums & Variants",
    items: [
      {
        label: "Sum Types",
        description: "inl/inr construction and case analysis",
        code: `value = (inl 5 as Nat+Bool) : Nat+Bool;

(case value || inl x => x || inr y => 0);`,
      },
      {
        label: "Variants",
        description: "labeled sum type and case-of-variant",
        code: `shape = ([circle=1] as [circle:Nat, square:Nat]) : [circle:Nat, square:Nat];

(case shape of [circle=r] => r || [square=s] => s);`,
      },
    ],
  },
  {
    title: "Tuples & Records",
    items: [
      {
        label: "Tuples",
        description: "tuple literal and positional projection",
        code: `(<1, true, 2>.2);`,
      },
      {
        label: "Records",
        description: "record literal and field projection",
        code: `(<name=1, flag=true>.flag);`,
      },
      {
        label: "Projections",
        description: "projection through a function, and chained tuple.record projection",
        code: `swap = λ p : <Nat*Nat> . <p.2, p.1> : <Nat*Nat> -> <Nat*Nat>;

<((swap <7, 9>).1), (<10, <label=20, flag=true>>.2.label)>;`,
      },
    ],
  },
  {
    title: "Lists",
    items: [
      {
        label: "Head of a list",
        description: "cons/nil construction, head extraction (lecture's own worked example)",
        code: `head[Nat] cons[Nat] 3 (cons[Nat] 8 nil[Nat]);`,
      },
      {
        label: "isnil",
        description: "isnil on an empty vs. a non-empty list",
        code: `isnil[Nat] (cons[Nat] 1 nil[Nat]);`,
      },
      {
        label: "tail",
        description: "drop the first element of a list",
        code: `tail[Nat] (cons[Nat] 1 (cons[Nat] 2 nil[Nat]));`,
      },
    ],
  },
  {
    title: "Iso-recursive Types (μ)",
    items: [
      {
        label: "Peano zero (μ)",
        description: "Nat = μX.[zero:Unit, succ:X] — fold/unfold-encoded zero, tested with iszero (lecture's own worked example, enable the Iso-recursive types theory)",
        code: `typedef PeanoNat = μX.[zero:Unit, succ:X];

zero = fold[PeanoNat] ([zero=unit] as [zero:Unit, succ:PeanoNat]) : PeanoNat;

iszero = λ n : PeanoNat . (case unfold[PeanoNat] n of [zero=x] => true || [succ=y] => false) : PeanoNat -> Bool;

iszero zero;`,
      },
      {
        label: "Peano succ + iszero (μ)",
        description: "same Peano encoding, iszero on succ zero — pattern-matches the \"succ\" branch via unfold",
        code: `typedef PeanoNat = μX.[zero:Unit, succ:X];

zero = fold[PeanoNat] ([zero=unit] as [zero:Unit, succ:PeanoNat]) : PeanoNat;

succ = λ n : PeanoNat . fold[PeanoNat] ([succ=n] as [zero:Unit, succ:PeanoNat]) : PeanoNat -> PeanoNat;

iszero = λ n : PeanoNat . (case unfold[PeanoNat] n of [zero=x] => true || [succ=y] => false) : PeanoNat -> Bool;

iszero (succ zero);`,
      },
      {
        label: "fold/unfold cancellation",
        description: "unfold[T](fold[T] v) → v in a single step (E-unfoldfold) — the isomorphism witnessed directly",
        code: `typedef PeanoNat = μX.[zero:Unit, succ:X];

unfold[PeanoNat] (fold[PeanoNat] ([zero=unit] as [zero:Unit, succ:PeanoNat]));`,
      },
    ],
  },
  {
    title: "Recursion (fix)",
    items: [
      {
        label: "Factorial (fix)",
        description: "classic fix g factorial, g : (Nat->Nat)->Nat->Nat",
        code: `g = λ f : Nat -> Nat . λ n : Nat . if n == 0 then 1 else n * (f (n - 1)) : (Nat -> Nat) -> Nat -> Nat;

(fix g) 5;`,
      },
      {
        label: "Fibonacci (fix)",
        description: "two recursive calls per step, g : (Nat->Nat)->Nat->Nat",
        code: `fib = λ f : Nat -> Nat . λ n : Nat . if n <= 1 then n else (f (n - 1)) + (f (n - 2)) : (Nat -> Nat) -> Nat -> Nat;

(fix fib) 7;`,
      },
      {
        label: "Non-terminating (fix)",
        description: "fix (λx:Nat.x) unfolds to itself forever — hits the step limit",
        code: `fix (λ x : Nat . x);`,
      },
    ],
  },
  {
    title: "Let & Polymorphism",
    items: [
      {
        label: "Let Bindings",
        description: "bind a name with let, then use it in the body",
        code: `let x = true in (if x then 1 else 2);`,
      },
      {
        label: "Let-bound Function",
        description: "bind a function with let, then apply it in the body",
        code: `let apply = λ f . λ x . f x in (apply (λ y : Nat . y) 5);`,
      },
      {
        label: "Nested Let",
        description: "an inner let shadows the outer binding of the same name",
        code: `let x = 1 in (let x = true in x);`,
      },
      {
        label: "Let-polymorphism: id",
        description: "id is generalized so it's reused at Nat and Bool in the same body",
        code: `let id = λ x . x in <(id 5), (id true)>;`,
      },
      {
        label: "Let-polymorphism: const",
        description: "const is generalized over two independent type variables (∀A,B. A -> B -> A)",
        code: `let const = λ x . λ y . x in <(const 1 true), (const false 2)>;`,
      },
      {
        label: "Type Inference: identity",
        description: "with the Type inference theory on, an unannotated λ works outside let too",
        code: `(λ x . x) 5;`,
      },
      {
        label: "Type Inference: from usage",
        description: "with Type inference on, f's type is inferred from how it's used inside the body, not annotated",
        code: `(λ f . f 5) (λ x : Nat . x + 1);`,
      },
    ],
  },
  {
    title: "System F",
    items: [
      {
        label: "Polymorphic Identity",
        description: "explicit type abstraction (ΛX.t) and application (t [T]) — enable the System F theory",
        code: `id = ΛX. λ x : X . x : ∀X. X -> X;

<(id[Nat] 5), (id[Bool] true)>;`,
      },
      {
        label: "Polymorphic Compose",
        description: "three explicit type parameters, instantiated differently at the call site",
        code: `compose = ΛA. ΛB. ΛC. λ f : B -> C . λ g : A -> B . λ x : A . f (g x) : ∀A. ∀B. ∀C. (B -> C) -> (A -> B) -> A -> C;

inc = λ x : Nat . x + 1 : Nat -> Nat;
isZero = λ x : Nat . (x == 0) : Nat -> Bool;

(compose[Nat][Nat][Bool] isZero inc) 5;`,
      },
    ],
  },
  {
    title: "System Fω (Type Constructors)",
    items: [
      {
        label: "Identity Constructor",
        description: "typedef Id = λX:@. X — a type constructor of kind @→@, applied to Nat — enable the System Fω theory",
        code: `typedef Id = λ X : @ . X;

f = λ x : (Id Nat) . x + 1 : (Id Nat) -> (Id Nat);

f 5;`,
      },
      {
        label: "Endo Constructor",
        description: "typedef Endo = λX:@. X->X builds a function-type-of-T from any T, classified by kind @→@",
        code: `typedef Endo = λ X : @ . X -> X;

inc = λ x : Nat . x + 1 : Nat -> Nat;

apply = λ f : (Endo Nat) . λ x : Nat . f x : (Endo Nat) -> Nat -> Nat;

apply inc 5;`,
      },
    ],
  },
  {
    title: "System λP (Dependent Types)",
    items: [
      {
        label: "Dependent Head",
        description: "typedef Vec : Nat -> @ declares an opaque, term-indexed type family; head's Πn:Nat. Vec[n] -> Nat return type is instantiated per call — enable the System λP theory",
        code: `// Vec is a family of types indexed by a Nat: Vec[0], Vec[1], Vec[2] ...
// are each distinct, unrelated types. It's declared "opaque" — only its
// kind is given (Nat -> @, i.e. "feed it a number, get back a type"), not
// what it actually contains, so Vec[3] never unfolds into anything
// simpler. It just IS a type, the same way Nat itself doesn't unfold.
typedef Vec : Nat -> @;

// v3 has type Vec[3] specifically, not Vec[4], not Vec[100].
v3 : Vec[3];

// head's type is a Π-type (dependent function type): give it a number n,
// and it hands back a function expecting Vec[n] — THE SAME n — and
// producing Nat. Unlike a plain A -> B, the type of the 2nd argument
// changes with whichever n you passed first: head 3 expects Vec[3],
// head 5 expects Vec[5].
head = λ n : Nat . λ x : Vec[n] . n : Π n : Nat . Vec[n] -> Nat;

// head 3 has type Vec[3] -> Nat, and v3 : Vec[3] — matches, type-checks.
head 3 v3;`,
      },
      {
        label: "Dependent Head: Type Mismatch",
        description: "same as above, but v4 : Vec[4] is passed where Vec[3] is expected — rejected because the index is part of the type",
        code: `// Same opaque Vec family as the "Dependent Head" example.
typedef Vec : Nat -> @;

// v4 has type Vec[4], NOT Vec[3].
v4 : Vec[4];

head = λ n : Nat . λ x : Vec[n] . n : Π n : Nat . Vec[n] -> Nat;

// head 3 expects an argument of type Vec[3], but v4 : Vec[4] is a
// DIFFERENT type (Vec[3] ≠ Vec[4], same as Nat ≠ Bool) — so this is
// rejected: "Cannot unify Vec[3] with Vec[4]". That's the payoff of
// dependent types: the mismatch is caught before the program ever runs.
head 3 v4;`,
      },
    ],
  },
];

interface ExamplesDropdownProps {
  onSelect: (code: string) => void;
}

export function ExamplesDropdown({ onSelect }: ExamplesDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          Examples
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 max-h-[70vh] overflow-y-auto">
        {EXAMPLE_GROUPS.map((group, groupIndex) => (
          <div key={group.title}>
            {groupIndex > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
            {group.items.map((ex) => (
              <DropdownMenuItem key={ex.label} onClick={() => onSelect(ex.code)}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{ex.label}</span>
                  <span className="text-xs text-muted-foreground">{ex.description}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
