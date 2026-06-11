import type {Term} from "@/shared/core/domain/ast";

export enum EvaluationStrategy {
  NORMAL = "NORMAL",
  CALL_BY_VALUE = "CALL_BY_VALUE",
  CALL_BY_NAME = "CALL_BY_NAME",
}

export interface ReductionStep {
  before: Term;
  after: Term;
  selectedId: string;
  resultId?: string;
}

export interface EvaluationError {
  message: string;
  stuckTermId?: string;
}

export interface EvaluationResult {
  result: Term;
  steps: ReductionStep[];
  reachedStepLimit: boolean;
  strategy: EvaluationStrategy;
  errors?: EvaluationError[];
}

