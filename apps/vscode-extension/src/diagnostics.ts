import * as vscode from "vscode";
import {
	AntlrParserAdapter,
	ParseSyntaxError,
	SLTLCTypeChecker,
	TypeCheckError,
} from "@vladyslav005/tt-core";

const LANGUAGE_ID = "tt";
const LINT_DEBOUNCE_MS = 300;

// Positions from tt-core follow ANTLR's convention (1-based line, 0-based column),
// diagnostics.Range wants both 0-based.
interface CorePosition {
	line: number;
	column: number;
	length: number;
	endLine?: number;
	endColumn?: number;
}

function toRange(pos: CorePosition): vscode.Range {
	const startLine = Math.max(pos.line - 1, 0);
	const endLine = Math.max((pos.endLine ?? pos.line) - 1, 0);
	const endColumn = pos.endColumn ?? pos.column + pos.length;
	return new vscode.Range(startLine, pos.column, endLine, endColumn);
}

export function lintDocument(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
	if (document.languageId !== LANGUAGE_ID) {
		return;
	}

	const diagnostics: vscode.Diagnostic[] = [];
	const parser = new AntlrParserAdapter();

	let program;
	try {
		program = parser.parseExpression(document.getText());
	} catch (error) {
		if (error instanceof ParseSyntaxError) {
			for (const e of error.errors) {
				diagnostics.push(new vscode.Diagnostic(toRange(e), e.message, vscode.DiagnosticSeverity.Error));
			}
		}
		collection.set(document.uri, diagnostics);
		return;
	}

	const checker = new SLTLCTypeChecker();
	checker.check(program);

	for (const err of checker.getErrors()) {
		const pos = err instanceof TypeCheckError ? err.pos : undefined;
		const range = pos ? toRange(pos) : new vscode.Range(0, 0, 0, 1);
		diagnostics.push(new vscode.Diagnostic(range, err.message, vscode.DiagnosticSeverity.Error));
	}

	collection.set(document.uri, diagnostics);
}

export function registerDiagnostics(context: vscode.ExtensionContext): vscode.DiagnosticCollection {
	const collection = vscode.languages.createDiagnosticCollection(LANGUAGE_ID);
	context.subscriptions.push(collection);

	const timers = new Map<string, ReturnType<typeof setTimeout>>();

	const scheduleLint = (document: vscode.TextDocument) => {
		if (document.languageId !== LANGUAGE_ID) {
			return;
		}
		const key = document.uri.toString();
		clearTimeout(timers.get(key));
		timers.set(key, setTimeout(() => lintDocument(document, collection), LINT_DEBOUNCE_MS));
	};

	vscode.workspace.textDocuments.forEach((doc) => lintDocument(doc, collection));

	context.subscriptions.push(
		vscode.workspace.onDidOpenTextDocument((doc) => lintDocument(doc, collection)),
		vscode.workspace.onDidChangeTextDocument((e) => scheduleLint(e.document)),
		vscode.workspace.onDidCloseTextDocument((doc) => {
			collection.delete(doc.uri);
			const key = doc.uri.toString();
			clearTimeout(timers.get(key));
			timers.delete(key);
		}),
	);

	return collection;
}
