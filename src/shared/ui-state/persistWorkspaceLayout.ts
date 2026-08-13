import type {SerializedDockview} from "dockview-react";

const STORAGE_KEY = "tt.workspace-layout.v1";

export function loadPersistedWorkspaceLayout(): SerializedDockview | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as SerializedDockview;
  } catch {
    return undefined;
  }
}

export function persistWorkspaceLayout(layout: SerializedDockview): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
  } catch {
    // Storage full or unavailable (e.g. private browsing) — layout just won't persist.
  }
}

export function clearPersistedWorkspaceLayout(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore — nothing to clean up if storage isn't available.
  }
}
