import * as vscode from "vscode";
import { Evaluator } from "@vladyslav005/tt-core";
import { analysisCache } from "../analysis";
import { formatEvaluationResultText } from "../evaluation/format";
import { ttOutputChannel } from "../outputChannel";
import { getEvaluationStrategy } from "../settings";

export function registerEvaluateCurrentFileCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.evaluateCurrentFile", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showWarningMessage("No active editor.");
				return;
			}

			const analysis = analysisCache.getAnalysis(editor.document);
			ttOutputChannel.clear();
			ttOutputChannel.appendLine(`TT: Evaluate ${editor.document.fileName}`);

			if (analysis.parseErrors) {
				for (const e of analysis.parseErrors) {
					ttOutputChannel.appendLine(`Parse error: ${e.message}`);
				}
				ttOutputChannel.show(true);
				return;
			}

			if (analysis.typeErrors?.length) {
				for (const e of analysis.typeErrors) {
					ttOutputChannel.appendLine(`Type error: ${e.message}`);
				}
			}

			const result = new Evaluator().evaluate(analysis.program!, getEvaluationStrategy());
			ttOutputChannel.appendLine(formatEvaluationResultText(result));
			ttOutputChannel.show(true);
		}),
	);
}
