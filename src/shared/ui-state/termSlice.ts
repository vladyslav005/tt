// src/store/counterSlice.ts
import {createSlice} from "@reduxjs/toolkit";
import type {Program} from "@/shared/core/domain/ast";
import type {ProofTree} from "@/shared/core/domain/typecheck/ProofTree.ts";

interface TermState {
  termText: string | undefined;
  processingErrors?: Error[];
  ast: Program | undefined;
  proof: ProofTree | undefined;
}

const initialState: TermState = {
  termText: undefined,
  processingErrors: undefined,
  ast: undefined,
  proof: undefined
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

    setAst: (state, action: { payload: Program | undefined }) => {
      state.ast = action.payload;
    },

    pushProcessingError: (state, action: { payload: Error }) => {
      if (!state.processingErrors) {
        state.processingErrors = [];
      }

      state.processingErrors?.push(action.payload);
    },

    cleanErrors: (state) => {
      state.processingErrors = undefined;
    }
  },
});

export const {
  setTermText,
  setProof,
  setAst,
  pushProcessingError,
  cleanErrors
} = counterSlice.actions;
export default counterSlice.reducer;