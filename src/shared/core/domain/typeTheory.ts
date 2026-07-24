export type TypeTheoryId = "letPolymorphism";

export interface TypeTheoryConfig {
  letPolymorphism: boolean;
}

export const DEFAULT_TYPE_THEORY_CONFIG: TypeTheoryConfig = {
  letPolymorphism: true,
};

export interface TypeTheoryDescriptor {
  id: TypeTheoryId;
  label: string;
  description: string;
}

// Toggleable extensions on top of STLC, which is always enabled. Add a new
// entry here (and a matching field on TypeTheoryConfig) for each future
// theory, e.g. System F.
export const TYPE_THEORIES: TypeTheoryDescriptor[] = [
  {
    id: "letPolymorphism",
    label: "Let-polymorphism",
    description: "Generalize let-bound values (Hindley-Milner) so they can be reused at different types",
  },
];
