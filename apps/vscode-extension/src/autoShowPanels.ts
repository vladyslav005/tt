import * as vscode from "vscode";
import { AstGraphPanel } from "./panels/astGraphPanel";
import { EvaluationStepsPanel } from "./panels/evaluationStepsPanel";
import { ProofTreePanel } from "./panels/proofTreePanel";

const LANGUAGE_ID = "tt";

export function registerAutoShowPanels(context: vscode.ExtensionContext): void {
	let shownThisSession = false;
	const userClosed = { evaluationSteps: false, proofTree: false, astGraph: false };

	function tryAutoShow(document: vscode.TextDocument): void {
		if (shownThisSession || document.languageId !== LANGUAGE_ID) {
			return;
		}
		shownThisSession = true;
		if (!userClosed.evaluationSteps) {
			EvaluationStepsPanel.createOrShow(context, document, vscode.ViewColumn.Two, () => {
				userClosed.evaluationSteps = true;
			});
		}
		if (!userClosed.proofTree) {
			ProofTreePanel.createOrShow(context, document, vscode.ViewColumn.Two, () => {
				userClosed.proofTree = true;
			});
		}
		if (!userClosed.astGraph) {
			AstGraphPanel.createOrShow(context, document, vscode.ViewColumn.Two, () => {
				userClosed.astGraph = true;
			});
		}
	}

	const activeDocument = vscode.window.activeTextEditor?.document;
	if (activeDocument) {
		tryAutoShow(activeDocument);
	}
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				tryAutoShow(editor.document);
			}
		}),
	);
}
