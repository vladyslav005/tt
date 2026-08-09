import type {Term} from "@/shared/core/domain/ast";
import type {ReductionStep} from "@/shared/core/application/evaluation/type.ts";

export interface BoundEntry {
  name: string;
  value: Term;
}

// The bindings established by every step up to and including `uptoIndex` —
// Γ's local half, growing as reduction proceeds (see ReductionStep.binding).
// A name rebound later (e.g. a recursive call reusing a parameter) keeps its
// original position but shows its latest value.
export function accumulateBindings(steps: ReductionStep[], uptoIndex: number): BoundEntry[] {
  const bindings = new Map<string, Term>();
  for (let i = 0; i <= uptoIndex && i < steps.length; i++) {
    const binding = steps[i].binding;
    if (binding) bindings.set(binding.name, binding.value);
  }
  return [...bindings.entries()].map(([name, value]) => ({name, value}));
}
