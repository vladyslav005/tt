import * as vscode from "vscode";

// Positions from tt-core follow ANTLR's convention (1-based line, 0-based column),
// diagnostics.Range wants both 0-based.
export interface CorePosition {
	line: number;
	column: number;
	length: number;
	endLine?: number;
	endColumn?: number;
}

export function toRange(pos: CorePosition): vscode.Range {
	const startLine = Math.max(pos.line - 1, 0);
	const endLine = Math.max((pos.endLine ?? pos.line) - 1, 0);
	const endColumn = pos.endColumn ?? pos.column + pos.length;
	return new vscode.Range(startLine, pos.column, endLine, endColumn);
}
