import type {TexRegistryEntry} from "@/presentation/tex/texTree.ts";
import type {Type} from "@/domain/ast";
import {typeEquals} from "@/application/typecheck/utils.ts";
import {TexMapper} from "@/presentation/tex/TexMapper.ts";

// Unlike GammaRegistry, every typedef is known up front, so the whole registry is built once.
// Any node whose checked type structurally equals a typedef's target gets offered the toggle.
export class TypeAliasRegistry {
  readonly registry: Record<string, TexRegistryEntry> = {};
  private readonly entries: { name: string; type: Type; key: string }[] = [];

  constructor(aliases: { [name: string]: Type }) {
    for (const [name, type] of Object.entries(aliases)) {
      const key = `A_${name}`;
      this.registry[key] = {shortTex: `\\text{${name}}`, fullTex: TexMapper.typeToTex(type)};
      this.entries.push({name, type, key});
    }
  }

  // First-defined-wins when more than one typedef resolves to the same type.
  refFor(type: Type): TexRegistryEntry & { key: string } | null {
    // A raw, not-yet-expanded reference to the alias by name.
    if (type.kind === "TyIdentifier") {
      const direct = this.entries.find((e) => e.name === type.name);
      if (direct) return {key: direct.key, ...this.registry[direct.key]};
    }

    // A display-time fold: some other node's checked type happens to equal the alias's target.
    const match = this.entries.find((e) => typeEquals(type, e.type));
    return match ? {key: match.key, ...this.registry[match.key]} : null;
  }
}
