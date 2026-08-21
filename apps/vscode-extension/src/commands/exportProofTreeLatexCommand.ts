import * as vscode from "vscode";
import { texTreeToEbproofDocument } from "@vladyslav005/tt-core";
import { analysisCache } from "../analysis";
import { computeTexTree } from "../proofTree/computeTexTree";

export function registerExportProofTreeLatexCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.exportProofTreeLatex", async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor || editor.document.languageId !== "tt") {
				vscode.window.showWarningMessage("Open a .tt file first.");
				return;
			}

			const analysis = analysisCache.getAnalysis(editor.document);
			if (analysis.parseErrors) {
				vscode.window.showWarningMessage("Fix the parse error before exporting the proof tree.");
				return;
			}
			if (!analysis.proof) {
				vscode.window.showWarningMessage("No proof tree to export.");
				return;
			}

			let mode: "derivation" | "logic" = "derivation";
			const { logicAvailable } = computeTexTree(analysis.proof, analysis.theories, analysis.typeAliases, "derivation");
			if (logicAvailable) {
				const picked = await vscode.window.showQuickPick(
					[
						{ label: "Typing Proof tree", mode: "derivation" as const },
						{ label: "Curry-Howard (logic)", mode: "logic" as const },
					],
					{ placeHolder: "Which proof tree view to export?" },
				);
				if (!picked) {
					return;
				}
				mode = picked.mode;
			}

			const { texTree } = computeTexTree(analysis.proof, analysis.theories, analysis.typeAliases, mode);
			// No node is expanded in the export snapshot — matches the tree's default collapsed
			// state; a viewer can re-expand Γ-refs in the compiled PDF's own reading, not here.
			const latex = texTreeToEbproofDocument(texTree, { expandedKeys: new Set() });

			const suggestedName = editor.document.uri.fsPath.replace(/\.tt$/, "") + ".tex";
			const target = await vscode.window.showSaveDialog({
				defaultUri: vscode.Uri.file(suggestedName),
				filters: { "LaTeX": ["tex"] },
			});
			if (!target) {
				return;
			}

			await vscode.workspace.fs.writeFile(target, Buffer.from(latex, "utf8"));

			const openAction = "Open File";
			const choice = await vscode.window.showInformationMessage(`Exported proof tree to ${target.fsPath}`, openAction);
			if (choice === openAction) {
				const document = await vscode.workspace.openTextDocument(target);
				await vscode.window.showTextDocument(document);
			}
		}),
	);
}
