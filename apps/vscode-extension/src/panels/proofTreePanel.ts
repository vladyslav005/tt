import * as vscode from "vscode";
import { isPlainStlc, LogicMapper, NonStlcProofError, TexMapper, TexTree } from "@vladyslav005/tt-core";
import { analysisCache } from "../analysis";
import { revealPosition } from "../editorReveal";
import { toUnicodeRegistry, toUnicodeTree } from "../proofTree/latexToUnicode";
import { HostToProofTreeMessage, ProofTreePayload, ProofTreeToHostMessage } from "../webviewProtocol";
import { createTtWebviewPanel } from "./panelBase";

class ProofTreePanel {
	private static current: ProofTreePanel | undefined;

	private readonly panel: vscode.WebviewPanel;
	private document: vscode.TextDocument;
	private mode: "derivation" | "logic" = "derivation";

	static createOrShow(context: vscode.ExtensionContext, document: vscode.TextDocument): void {
		if (ProofTreePanel.current) {
			ProofTreePanel.current.document = document;
			ProofTreePanel.current.panel.reveal(vscode.ViewColumn.Beside);
			ProofTreePanel.current.refresh();
			return;
		}
		ProofTreePanel.current = new ProofTreePanel(context, document);
	}

	private constructor(context: vscode.ExtensionContext, document: vscode.TextDocument) {
		this.document = document;
		this.panel = createTtWebviewPanel(context, "ttProofTree", "TT: Proof Tree", "proofTree.js", "proofTree.css");
		this.panel.onDidDispose(() => {
			ProofTreePanel.current = undefined;
		});
		this.panel.webview.onDidReceiveMessage((msg: ProofTreeToHostMessage) => {
			if (msg.type === "ready") {
				this.refresh();
			} else if (msg.type === "setMode") {
				this.mode = msg.mode;
				this.refresh();
			} else if (msg.type === "revealPos") {
				void revealPosition(this.document.uri, msg.pos);
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

	private post(message: HostToProofTreeMessage): void {
		this.panel.webview.postMessage(message);
	}

	private refresh(): void {
		const analysis = analysisCache.getAnalysis(this.document);
		if (analysis.parseErrors) {
			this.post({ type: "invalid", messages: analysis.parseErrors.map((e) => e.message) });
			return;
		}
		if (!analysis.proof) {
			this.post({ type: "clear" });
			return;
		}

		const logicAvailable = isPlainStlc(analysis.theories);
		const effectiveMode = this.mode === "logic" && !logicAvailable ? "derivation" : this.mode;

		let texTree: TexTree;
		try {
			const mapper = effectiveMode === "logic" ? new LogicMapper() : new TexMapper();
			mapper.setTypeAliases(analysis.typeAliases ?? {});
			texTree = mapper.visit(analysis.proof);
		} catch (error) {
			if (error instanceof NonStlcProofError) {
				const fallback = new TexMapper();
				fallback.setTypeAliases(analysis.typeAliases ?? {});
				texTree = fallback.visit(analysis.proof);
			} else {
				throw error;
			}
		}

		const payload: ProofTreePayload = {
			mode: effectiveMode,
			logicAvailable,
			registry: toUnicodeRegistry(texTree.registry ?? {}),
			tree: toUnicodeTree(texTree),
		};
		this.post({ type: "render", payload });
	}
}

export function registerProofTreeCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.showProofTree", () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor || editor.document.languageId !== "tt") {
				vscode.window.showWarningMessage("Open a .tt file first.");
				return;
			}
			ProofTreePanel.createOrShow(context, editor.document);
		}),
	);
}
