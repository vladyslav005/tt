import type {Program} from "@/shared/core/domain/ast";

export interface Parser {
  parseExpression(input: string): Program
}