import * as vscode from "vscode";
import { analysisCache } from "../analysis";
import { toAstGraphNode } from "../astView/astStructure";
import { clearHighlight, highlightPosition } from "../editorHighlight";
import { AstGraphToHostMessage, HostToAstGraphMessage } from "../webviewProtocol";
import { createTtWebviewPanel } from "./panelBase";

class AstGraphPanel {
	private static current: AstGraphPanel | undefined;

	private readonly panel: vscode.WebviewPanel;
	private document: vscode.TextDocument;
	private wasVisible = true;

	static createOrShow(
		context: vscode.ExtensionContext,
		document: vscode.TextDocument,
		column: vscode.ViewColumn = vscode.ViewColumn.Beside,
		onClosedByUser?: () => void,
	): void {
		if (AstGraphPanel.current) {
			AstGraphPanel.current.document = document;
			AstGraphPanel.current.panel.reveal();
			AstGraphPanel.current.refresh();
			return;
		}
		AstGraphPanel.current = new AstGraphPanel(context, document, column, onClosedByUser);
	}

	private constructor(
		context: vscode.ExtensionContext,
		document: vscode.TextDocument,
		column: vscode.ViewColumn,
		onClosedByUser?: () => void,
	) {
		this.document = document;
		this.panel = createTtWebviewPanel(context, "ttAstGraph", "TT: AST Diagram", "astGraph.js", "astGraph.css", column);
		this.panel.onDidDispose(() => {
			AstGraphPanel.current = undefined;
			onClosedByUser?.();
		});
		// A panel auto-opened as a background tab renders once at zero size; re-sending the
		// render payload the moment it FIRST becomes visible gives the webview's fit-to-view
		// logic another chance to run against real dimensions. Only that hidden->visible edge
		// matters — `visible` also stays true while merely losing/regaining focus (e.g. clicking
		// into the editor), and refreshing on every such no-op wipes the user's pan/zoom state.
		this.panel.onDidChangeViewState((e) => {
			const isVisible = e.webviewPanel.visible;
			if (isVisible && !this.wasVisible) {
				this.refresh();
			}
			this.wasVisible = isVisible;
		});
		this.panel.webview.onDidReceiveMessage((msg: AstGraphToHostMessage) => {
			if (msg.type === "ready") {
				this.refresh();
			} else if (msg.type === "hoverPos") {
				highlightPosition(this.document.uri, msg.pos);
			} else if (msg.type === "unhoverPos") {
				clearHighlight(this.document.uri);
			}
		});

		context.subscriptions.push(
			vscode.workspace.onDidChangeTextDocument((e) => {
				if (e.document.uri.toString() === this.document.uri.toString()) {
					this.refresh();
				}
			}),
		);
	}

	private post(message: HostToAstGraphMessage): void {
		this.panel.webview.postMessage(message);
	}

	private refresh(): void {
		const analysis = analysisCache.getAnalysis(this.document);
		if (analysis.parseErrors) {
			this.post({ type: "invalid", messages: analysis.parseErrors.map((e) => e.message) });
			return;
		}
		if (!analysis.program) {
			this.post({ type: "clear" });
			return;
		}
		this.post({ type: "render", payload: { tree: toAstGraphNode(analysis.program, "Program") } });
	}
}

export function registerAstGraphCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.showAstGraph", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor || editor.document.languageId !== "tt") {
				vscode.window.showWarningMessage("Open a .tt file first.");
				return;
			}
			AstGraphPanel.createOrShow(context, editor.document);
		}),
	);
}

export { AstGraphPanel };
