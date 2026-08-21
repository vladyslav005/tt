import * as vscode from "vscode";
import { CorePosition, toRange } from "./positions";

// A decoration, not a selection/reveal — hovering a node in a panel should highlight the
// corresponding source span without moving the cursor, changing the selection, or stealing
// focus away from wherever the user's mouse actually is.
const highlightDecorationType = vscode.window.createTextEditorDecorationType({
	backgroundColor: new vscode.ThemeColor("editor.rangeHighlightBackground"),
	borderRadius: "2px",
});

function findVisibleEditor(uri: vscode.Uri): vscode.TextEditor | undefined {
	return vscode.window.visibleTextEditors.find((editor) => editor.document.uri.toString() === uri.toString());
}

export function highlightPosition(uri: vscode.Uri, pos: CorePosition): void {
	const editor = findVisibleEditor(uri);
	if (!editor) {
		return;
	}
	editor.setDecorations(highlightDecorationType, [toRange(pos)]);
}

export function clearHighlight(uri: vscode.Uri): void {
	const editor = findVisibleEditor(uri);
	if (!editor) {
		return;
	}
	editor.setDecorations(highlightDecorationType, []);
}
