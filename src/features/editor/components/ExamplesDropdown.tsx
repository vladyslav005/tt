import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

// const EXAMPLES: { label: string; description: string; code: string }[] = [
//   {
//     label: "Identity",
//     description: "Identity function",
//     code: "a : T;\n(λ x : T . x) a;",
//   },
//   {
//     label: "Boolean if",
//     description: "If-then-else expression",
//     code: "if true then false else true",
//   },
//   {
//     label: "Natural numbers",
//     description: "Successor and iszero",
//     code: "iszero (succ (succ 0))",
//   },
//   {
//     label: "Nested abstraction",
//     description: "Curried function",
//     code: "λ x : Nat . λ y : Nat . succ x",
//   },
//   {
//     label: "Type alias",
//     description: "typedef + abstraction",
//     code: "typedef MyNat = Nat;\n(λ x : MyNat . succ x) : MyNat -> MyNat",
//   },
//   {
//     label: "Fix point",
//     description: "Recursive function via fix",
//     code: "fix (λ f : Nat -> Nat . λ n : Nat . if iszero n then 0 else succ (f (pred n)))",
//   },
// ];
const EXAMPLES: { label: string; description: string; code: string }[] = [
  {
    label: "Identity",
    description: "Identity function",
    code: "a : T;\n(λ x : T . x) a;",
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
    label: "Ascription & Sequencing",
    description: "t1 : Unit ; t2, then ascribed",
    code: `((unit; 42) as Nat);`,
  },
  {
    label: "Dummy Abstraction",
    description: "λ_:T.t discards its argument",
    code: `((λ _ : Nat . true) 5);`,
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
          Examples
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Expression examples</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {EXAMPLES.map((ex) => (
          <DropdownMenuItem key={ex.label} onClick={() => onSelect(ex.code)}>
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{ex.label}</span>
              <span className="text-xs text-muted-foreground">{ex.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
