import type {Type} from "@/shared/core/domain/ast";

export function typeEquals(a: Type, b: Type): boolean {
  if (a.kind !== b.kind) return false;

  switch (a.kind) {
    case "TyVar":
      return true;

    case "TyArrow":
      return (
        typeEquals(a.from, (b as any).from) &&
        typeEquals(a.to, (b as any).to)
      );
  }
}