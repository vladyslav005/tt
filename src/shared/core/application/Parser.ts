import type {Program} from "@/shared/core/domain";

export interface Parser {
  parseExpression(input: string): Program
}