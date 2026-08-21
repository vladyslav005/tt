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

			ttOutputChannel.clear();
			ttOutputChannel.appendLine(`TT: Evaluate ${editor.document.fileName}`);
			ttOutputChannel.show(true);

			try {
				const analysis = analysisCache.getAnalysis(editor.document);

				if (analysis.parseErrors) {
					for (const e of analysis.parseErrors) {
						ttOutputChannel.appendLine(`Parse error: ${e.message}`);
					}
					return;
				}

				if (analysis.typeErrors?.length) {
					for (const e of analysis.typeErrors) {
						ttOutputChannel.appendLine(`Type error: ${e.message}`);
					}
				}

				if (!analysis.program!.term) {
					ttOutputChannel.appendLine("No expression to evaluate — add a trailing term after your declarations.");
					return;
				}

				const result = new Evaluator().evaluate(analysis.program!, getEvaluationStrategy());
				ttOutputChannel.appendLine(formatEvaluationResultText(result));
			} catch (error) {
				// Catches anything unanticipated too (a checker/evaluator bug on some construct,
				// not just the cases handled above) — the channel should never end up silently
				// empty just because something threw.
				ttOutputChannel.appendLine(`Unexpected error: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`);
			}
		}),
	);
}
