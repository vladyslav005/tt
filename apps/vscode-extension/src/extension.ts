// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	AntlrParserAdapter,
} from "@vladyslav005/tt-core";
import {registerDiagnostics} from "./diagnostics";
import {registerCompletions} from "./completions";

export function activate(context: vscode.ExtensionContext) {
	registerDiagnostics(context);
	registerCompletions(context);

	const disposable = vscode.commands.registerCommand(
		"tt-vscode-extension.parseCurrentFile",
		() => {
			const editor = vscode.window.activeTextEditor;

			if (!editor) {
				vscode.window.showWarningMessage("No active editor.");
				return;
			}

			const source = editor.document.getText();

			try {
				const parser = new AntlrParserAdapter();

				parser.parseExpression(source);

				vscode.window.showInformationMessage(
					"TT: parsing successful",
				);
			} catch (error) {
				vscode.window.showErrorMessage(
					`TT: parsing failed: ${String(error)}`,
				);
			}
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
