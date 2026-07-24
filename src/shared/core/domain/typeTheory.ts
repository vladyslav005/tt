export type TypeTheoryId = "letPolymorphism" | "typeInference" | "systemF";

export interface TypeTheoryConfig {
  letPolymorphism: boolean;
  typeInference: boolean;
  systemF: boolean;
}

export const DEFAULT_TYPE_THEORY_CONFIG: TypeTheoryConfig = {
  letPolymorphism: true,
  typeInference: false,
  systemF: false,
};

export interface TypeTheoryDescriptor {
  id: TypeTheoryId;
  label: string;
  description: string;
}

// Toggleable extensions on top of STLC, which is always enabled. Add a new
// entry here (and a matching field on TypeTheoryConfig) for each future
// theory.
export const TYPE_THEORIES: TypeTheoryDescriptor[] = [
  {
    id: "letPolymorphism",
    label: "Let-polymorphism",
    description: "Generalize let-bound values (Hindley-Milner) so they can be reused at different types",
  },
  {
    id: "typeInference",
    label: "Type inference",
    description: "Allow omitting a lambda's parameter type anywhere; it's inferred from how the parameter is used (always allowed inside a let-bound value)",
  },
  {
    id: "systemF",
    label: "System F",
    description: "Explicit polymorphism via type abstraction (ΛX. t) and type application (t [T])",
  },
];
