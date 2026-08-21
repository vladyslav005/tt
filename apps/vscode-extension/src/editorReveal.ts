import * as vscode from "vscode";
import { CorePosition, toRange } from "./positions";

export async function revealPosition(uri: vscode.Uri, pos: CorePosition): Promise<void> {
	const document = await vscode.workspace.openTextDocument(uri);
	const editor = await vscode.window.showTextDocument(document, { preserveFocus: true, preview: false });
	const range = toRange(pos);
	editor.revealRange(range, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
	editor.selection = new vscode.Selection(range.start, range.end);
}
