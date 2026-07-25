import type {TexRegistryEntry} from "@/shared/presentation/tex/texTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {typeEquals} from "@/shared/core/application/typecheck/utils.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";

// Unlike GammaRegistry (one entry per distinct Γ actually encountered while
// walking a derivation), every typedef is known up front and its expansion
// never varies by where it's used — so the whole registry is built once,
// from the typedef table, rather than incrementally per node. Any node
// whose *final, checked* type structurally equals a typedef's target gets
// offered the toggle, regardless of whether that node's term literally
// wrote the alias name — this is a display-time fold, not a typechecking
// fact carried on the node.
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
    // A raw, not-yet-expanded reference to the alias by name — e.g. a term's
    // own paramType/ascription, which the checker never mutates in place.
    // This isn't structurally equal to the alias's target (different name),
    // so it needs its own check rather than falling through to typeEquals.
    if (type.kind === "TyIdentifier") {
      const direct = this.entries.find((e) => e.name === type.name);
      if (direct) return {key: direct.key, ...this.registry[direct.key]};
    }

    // A display-time fold: some other node's fully-checked type happens to
    // structurally equal the alias's target, even though it never wrote
    // the alias name anywhere.
    const match = this.entries.find((e) => typeEquals(type, e.type));
    return match ? {key: match.key, ...this.registry[match.key]} : null;
  }
}
