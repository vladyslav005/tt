import type {TexRegistryEntry} from "@/shared/presentation/tex/texTree.ts";
import type {TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";

export interface SetRegistration {
  key: string;
  shortTex: string;
  fullTex: string;
}

// Numbers each distinct Γ the first time it's seen while walking a
// derivation (Γ_1, Γ_2, ...), with a "recipe" explaining how it extends its
// parent context (Γ_2 = Γ_1 ∪ {x : Nat}) — shared by TexMapper's plain "T-*"
// judgements and LetPolymorphismTexMapper's constraint-typing ones, so a
// Γ_n reference behaves identically (numbered, independently expandable)
// whether or not it's inside a `let`.
export class GammaRegistry {
  readonly registry: Record<string, TexRegistryEntry> = {};
  private readonly bySignature = new Map<string, SetRegistration>();
  private nextIndex = 1;

  private signature(gamma: Record<string, Type | TypeScheme>): string {
    return Object.entries(gamma)
      .map(([name, t]) => `${name}:${TexMapper.typeToTex(t)}`)
      .sort()
      .join(",");
  }

  register(
    gamma: Record<string, Type | TypeScheme>,
    parentGamma: Record<string, Type | TypeScheme> | null,
  ): SetRegistration | null {
    const entries = Object.entries(gamma);
    if (entries.length === 0) {
      return null;
    }

    const signature = this.signature(gamma);
    const existing = this.bySignature.get(signature);
    if (existing) {
      return existing;
    }

    const parentEntries = parentGamma ? Object.entries(parentGamma) : [];
    const parentReg = parentGamma && parentEntries.length > 0
      ? this.bySignature.get(this.signature(parentGamma)) ?? null
      : null;

    const parentKeys = new Set(parentEntries.map(([name]) => name));
    const added = entries.filter(([name]) => !parentKeys.has(name));
    const addedTex = added.length > 0
      ? `\\{ ${added.map(([name, t]) => `${name} : ${TexMapper.typeToTex(t)}`).join(", ")} \\}`
      : null;

    const index = this.nextIndex++;
    const key = `G${index}`;
    const shortTex = `\\Gamma_{${index}}`;

    const recipe = parentReg && addedTex
      ? `${parentReg.shortTex} \\cup ${addedTex}`
      : addedTex
        ? addedTex
        : parentReg
          ? parentReg.shortTex
          : `\\{ ${entries.map(([name, t]) => `${name} : ${TexMapper.typeToTex(t)}`).join(", ")} \\}`;

    const registration: SetRegistration = {key, shortTex, fullTex: `${shortTex} = ${recipe}`};
    this.bySignature.set(signature, registration);
    this.registry[key] = {shortTex: registration.shortTex, fullTex: registration.fullTex};
    return registration;
  }

  refFor(gamma: Record<string, Type | TypeScheme>): SetRegistration | null {
    if (Object.keys(gamma).length === 0) {
      return null;
    }
    return this.bySignature.get(this.signature(gamma)) ?? null;
  }
}
