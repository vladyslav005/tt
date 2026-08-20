import type {SourcePosition} from "@/domain/ast";

export class TypeCheckError extends Error {
  constructor(message: string, public readonly pos?: SourcePosition) {
    super(message);
    this.name = "TypeCheckError";
  }
}
