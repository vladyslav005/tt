// src/store/counterSlice.ts
import {createSlice} from "@reduxjs/toolkit";
import type {Program, Type} from "@/shared/core/domain/ast";
import type {ProofTree, Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {EvaluationResult} from "@/shared/core/application/evaluation/type.ts";
import {DEFAULT_TYPE_THEORY_CONFIG, type TypeTheoryConfig, type TypeTheoryId} from "@/shared/core/domain/typeTheory.ts";
import {
  buildStudentNode,
  type ContextBinding,
  diffAgainstAnswer,
  findStudentNode,
  type StudentProofNode,
} from "@/shared/ui-state/studentProof.ts";

interface BuildModeState {
  active: boolean;
  // Frozen snapshot of `proof` so the answer can't drift mid-exercise.
  answerKey?: ProofTree;
  studentTree?: StudentProofNode;
}

export interface ParseErrorMarker {
  line: number;
  column: number;
  length: number;
  message: string;
}

interface TermState {
  termText: string | undefined;
  processingErrors?: Error[];
  parseMarkers: ParseErrorMarker[];
  ast: Program | undefined;
  proof: ProofTree | undefined;
  typeAliases: Record<string, Type>;
  evaluation: EvaluationResult | undefined;
  enabledTheories: TypeTheoryConfig;
  buildMode: BuildModeState;
}

const initialState: TermState = {
  termText: undefined,
  processingErrors: undefined,
  parseMarkers: [],
  ast: undefined,
  proof: undefined,
  typeAliases: {},
  evaluation: undefined,
  enabledTheories: DEFAULT_TYPE_THEORY_CONFIG,
  buildMode: {active: false},
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

    enterBuildMode: (state) => {
      if (!state.proof) return;
      state.buildMode = {
        active: true,
        answerKey: state.proof,
        studentTree: buildStudentNode(state.proof, true),
      };
    },

    exitBuildMode: (state) => {
      state.buildMode = {active: false};
    },

    // Correctness only surfaces later via Check Proof.
    chooseRule: (state, action: { payload: { nodeId: string; rule: Rule } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.nodeId);
      if (!node) return;

      node.chosenRule = action.payload.rule;
      node.ruleCheck = undefined;
      node.typeCheck = undefined;
    },

    revealPremise: (state, action: { payload: { premiseId: string } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.premiseId);
      if (!node) return;

      node.revealed = true;
    },

    setNodeType: (state, action: { payload: { nodeId: string; type: Type } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.nodeId);
      if (!node) return;

      node.writtenType = action.payload.type;
      node.typeCheck = undefined;
    },

    setNodeContext: (state, action: { payload: { nodeId: string; bindings: ContextBinding[] } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.nodeId);
      if (!node) return;

      node.writtenBindings = action.payload.bindings;
      node.contextCheck = undefined;
    },

    // Clears this node's own progress and re-hides its direct premises.
    resetNode: (state, action: { payload: { nodeId: string } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.nodeId);
      if (!node) return;

      node.chosenRule = undefined;
      node.ruleCheck = undefined;
      node.writtenType = undefined;
      node.typeCheck = undefined;
      node.writtenBindings = undefined;
      node.contextCheck = undefined;
      node.premises.forEach((premise) => { premise.revealed = false; });
    },

    checkProof: (state) => {
      if (!state.buildMode.studentTree || !state.buildMode.answerKey) return;
      diffAgainstAnswer(state.buildMode.studentTree, state.buildMode.answerKey);
    },

    pushProcessingError: (state, action: { payload: Error }) => {
      if (!state.processingErrors) {
        state.processingErrors = [];
      }

      state.processingErrors?.push(action.payload);
    },

    setParseMarkers: (state, action: { payload: ParseErrorMarker[] }) => {
      state.parseMarkers = action.payload;
    },

    clean: (state) => {
      state.processingErrors = [];
      state.parseMarkers = [];
      state.ast = undefined;
      state.proof = undefined;
      state.typeAliases = {};
      state.evaluation = undefined;
      state.buildMode = {active: false};
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
  enterBuildMode,
  exitBuildMode,
  chooseRule,
  revealPremise,
  setNodeType,
  setNodeContext,
  resetNode,
  checkProof,
  pushProcessingError,
  setParseMarkers,
  clean
} = counterSlice.actions;
export default counterSlice.reducer;