// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
	AntlrParserAdapter,
} from "@vladyslav005/tt-core";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"tt-vscode-extension.parseCurrentFile",
		() => {
			const editor = vscode.window.activeTextEditor;

			if (!editor) {
				vscode.window.showWarningMessage("No active editor.");
				return;
			}

			const source = editor.document.getText();

			console.log("Source:");
			console.log(source);

			try {
				const parser = new AntlrParserAdapter();

				const p = parser.parseExpression(source);

				console.warn(p);

				console.log("Parsing successful");

				vscode.window.showInformationMessage(
					"TT: parsing successful",
				);
			} catch (error) {
				console.error(error);

				vscode.window.showErrorMessage(
					`TT: parsing failed: ${String(error)}`,
				);
			}
		},
	);

	context.subscriptions.push(disposable);


	disposable = vscode.commands.registerCommand('tt-vscode-extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from tt-vscode-extension!');
	});

	context.subscriptions.push(disposable);


}

export function deactivate() {}
