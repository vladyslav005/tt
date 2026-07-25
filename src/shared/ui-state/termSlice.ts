// src/store/counterSlice.ts
import {createSlice} from "@reduxjs/toolkit";
import type {Program, Type} from "@/shared/core/domain/ast";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {EvaluationResult} from "@/shared/core/application/evaluation/type.ts";
import {DEFAULT_TYPE_THEORY_CONFIG, type TypeTheoryConfig, type TypeTheoryId} from "@/shared/core/domain/typeTheory.ts";

interface TermState {
  termText: string | undefined;
  processingErrors?: Error[];
  ast: Program | undefined;
  proof: ProofTree | undefined;
  typeAliases: Record<string, Type>;
  evaluation: EvaluationResult | undefined;
  enabledTheories: TypeTheoryConfig;
}

const initialState: TermState = {
  termText: undefined,
  processingErrors: undefined,
  ast: undefined,
  proof: undefined,
  typeAliases: {},
  evaluation: undefined,
  enabledTheories: DEFAULT_TYPE_THEORY_CONFIG,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTermText: (state, action: { payload: string | undefined }) => {
      state.termText = action.payload;
    },

    setProof: (state, action: { payload: ProofTree | undefined }) => {
      state.proof = action.payload;
    },

    setTypeAliases: (state, action: { payload: Record<string, Type> }) => {
      state.typeAliases = action.payload;
    },

    setAst: (state, action: { payload: Program | undefined }) => {
      state.ast = action.payload;
    },

    setEvaluation: (state, action: { payload: EvaluationResult | undefined }) => {
      state.evaluation = action.payload;
    },

    setTheoryEnabled: (state, action: { payload: { id: TypeTheoryId; enabled: boolean } }) => {
      state.enabledTheories[action.payload.id] = action.payload.enabled;
    },

    pushProcessingError: (state, action: { payload: Error }) => {
      if (!state.processingErrors) {
        state.processingErrors = [];
      }

      state.processingErrors?.push(action.payload);
    },

    clean: (state) => {
      state.processingErrors = [];
      state.ast = undefined;
      state.proof = undefined;
      state.typeAliases = {};
      state.evaluation = undefined;
    }
  },
});

export const {
  setEvaluation,
  setTermText,
  setProof,
  setTypeAliases,
  setAst,
  setTheoryEnabled,
  pushProcessingError,
  clean
} = counterSlice.actions;
export default counterSlice.reducer;