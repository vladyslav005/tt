import * as vscode from "vscode";
import { EVALUATION_STRATEGY_LABELS, TYPE_THEORIES } from "@vladyslav005/tt-core";
import { getEvaluationStrategy, getTypeTheoryConfig, onRelevantConfigChanged } from "./settings";

const LANGUAGE_ID = "tt";

export function registerStatusBar(context: vscode.ExtensionContext): void {
	const strategyItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	strategyItem.command = "tt-vscode-extension.chooseEvaluationStrategy";
	strategyItem.tooltip = "TT: click to choose evaluation strategy";

	const theoriesItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 99);
	theoriesItem.command = "tt-vscode-extension.toggleTypeTheories";
	theoriesItem.tooltip = "TT: click to toggle type theory extensions";

	context.subscriptions.push(strategyItem, theoriesItem);

	function refresh(): void {
		const activeEditor = vscode.window.activeTextEditor;
		// No active text editor doesn't mean "switched away from a .tt file" — it also
		// fires when focus moves to a webview panel, the Output panel, etc. Only hide
		// when we can see the user is actually on a different kind of file.
		if (!activeEditor) {
			return;
		}
		if (activeEditor.document.languageId !== LANGUAGE_ID) {
			strategyItem.hide();
			theoriesItem.hide();
			return;
		}

		strategyItem.text = `$(sync) ${EVALUATION_STRATEGY_LABELS[getEvaluationStrategy()]}`;
		strategyItem.show();

		const enabledCount = Object.values(getTypeTheoryConfig()).filter(Boolean).length;
		theoriesItem.text = `$(beaker) ${enabledCount}/${TYPE_THEORIES.length} type system extensions`;
		theoriesItem.show();
	}

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(refresh));
	onRelevantConfigChanged(context, refresh);
	refresh();
}
