import type {SourcePosition} from "@/shared/core/domain/ast";

export class TypeCheckError extends Error {
  constructor(message: string, public readonly pos?: SourcePosition) {
    super(message);
    this.name = "TypeCheckError";
  }
}
