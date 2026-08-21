import * as vscode from "vscode";

// A badge layered on top of whatever icon the user's own file-icon theme already assigns to
// .tt files — unlike contributes.iconThemes (exclusive; owns rendering for every file, not just
// .tt), decorations are additive and work alongside any theme the user already has selected.
export function registerFileDecoration(context: vscode.ExtensionContext): void {
	const provider: vscode.FileDecorationProvider = {
		provideFileDecoration(uri: vscode.Uri): vscode.FileDecoration | undefined {
			if (!uri.path.toLowerCase().endsWith(".tt")) {
				return undefined;
			}
			return {
				badge: "λ",
				color: new vscode.ThemeColor("charts.purple"),
				tooltip: "TT source file",
			};
		},
	};
	context.subscriptions.push(vscode.window.registerFileDecorationProvider(provider));
}
