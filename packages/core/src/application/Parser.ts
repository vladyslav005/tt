import type {Program} from "@/domain/ast";

export interface Parser {
  parseExpression(input: string): Program
}