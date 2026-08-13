import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type LayoutPresetId = "editorFocus" | "editorWide" | "compact" | "grid";

export interface LayoutPresetDescriptor {
  id: LayoutPresetId;
  label: string;
  description: string;
}

export const LAYOUT_PRESETS: LayoutPresetDescriptor[] = [
  {id: "editorFocus", label: "Editor Focus", description: "Editor and results side by side, results tabbed"},
  {id: "editorWide", label: "Editor Wide", description: "Editor full-width on top, results tabbed below"},
  {id: "grid", label: "Grid", description: "All panels visible at once, arranged in a grid"},
];

interface WorkspaceLayoutUiState {
  // Set by the topbar preset picker, consumed (and cleared) by WorkspaceLayout — it may not be
  // mounted yet (e.g. picked from another route), so this just waits until it is.
  pendingPreset: LayoutPresetId | null;
}

const initialState: WorkspaceLayoutUiState = {
  pendingPreset: null,
};

const workspaceLayoutSlice = createSlice({
  name: "workspaceLayoutUi",
  initialState,
  reducers: {
    requestLayoutPreset: (state, action: PayloadAction<LayoutPresetId>) => {
      state.pendingPreset = action.payload;
    },
    clearPendingLayoutPreset: (state) => {
      state.pendingPreset = null;
    },
  },
});

export const {requestLayoutPreset, clearPendingLayoutPreset} = workspaceLayoutSlice.actions;
export default workspaceLayoutSlice.reducer;
