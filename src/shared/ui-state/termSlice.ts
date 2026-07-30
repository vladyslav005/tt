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
  findAnswerNode,
  findStudentNode,
  type StudentProofNode,
} from "@/shared/ui-state/studentProof.ts";
import {ruleAppliesToTerm} from "@/shared/core/application/typecheck/ruleSchemas.ts";

interface BuildModeState {
  active: boolean;
  // Snapshot of `proof` taken the moment build mode is entered — frozen for
  // the duration of the exercise so the "answer" can't drift under the
  // student while they're mid-construction.
  answerKey?: ProofTree;
  studentTree?: StudentProofNode;
}

interface TermState {
  termText: string | undefined;
  processingErrors?: Error[];
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

    // Snapshots the current `proof` as the (frozen) answer key and builds
    // the initial, all-hidden-except-root student tree from it. No-ops if
    // there's no proof yet — the UI is expected to gate the entry point on
    // that (and on the proof being error-free) before ever dispatching this.
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

    // A rule pick's structural fit (does it match this node's term shape,
    // per ruleAppliesToTerm) is checked and stamped immediately, against
    // the frozen answer key's term at that same node. Premises are NOT
    // auto-revealed here — the student has to actively identify each one by
    // clicking its sub-term in the rendered judgement (see revealPremise).
    chooseRule: (state, action: { payload: { nodeId: string; rule: Rule } }) => {
      const {studentTree, answerKey} = state.buildMode;
      if (!studentTree || !answerKey) return;

      const node = findStudentNode(studentTree, action.payload.nodeId);
      const answerNode = findAnswerNode(answerKey, action.payload.nodeId);
      if (!node || !answerNode) return;

      const valid = ruleAppliesToTerm(action.payload.rule, answerNode.term);

      node.chosenRule = action.payload.rule;
      node.ruleValid = valid;
      node.typeCheck = undefined;
    },

    // Dispatched when the student clicks a premise's sub-term inside its
    // parent's rendered judgement — the "identify the premise" step.
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

    // Clears a single node's own progress (rule/type/context) and re-hides
    // its direct premises so they must be re-identified — but leaves
    // grandchildren's own filled-in data untouched (non-destructive).
    resetNode: (state, action: { payload: { nodeId: string } }) => {
      const node = state.buildMode.studentTree && findStudentNode(state.buildMode.studentTree, action.payload.nodeId);
      if (!node) return;

      node.chosenRule = undefined;
      node.ruleValid = undefined;
      node.writtenType = undefined;
      node.typeCheck = undefined;
      node.writtenBindings = undefined;
      node.contextCheck = undefined;
      node.premises.forEach((premise) => { premise.revealed = false; });
    },

    // Diffs every currently-filled (rule + type both written) node against
    // the frozen answer key, stamping typeCheck "valid"/"invalid". Nodes
    // the student hasn't reached yet are left alone — re-runnable any time.
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

    clean: (state) => {
      state.processingErrors = [];
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
  clean
} = counterSlice.actions;
export default counterSlice.reducer;