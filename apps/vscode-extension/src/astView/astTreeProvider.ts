import * as vscode from "vscode";
import { analysisCache } from "../analysis";
import { AnyAstNode, ChildEntry, childrenOf, describe } from "./astStructure";

export class AstTreeItem extends vscode.TreeItem {
	constructor(
		public readonly astNode: AnyAstNode,
		label: string,
	) {
		super(label, vscode.TreeItemCollapsibleState.None);
		this.description = describe(astNode);
		this.contextValue = astNode.kind;
		if (astNode.pos) {
			const pos = astNode.pos;
			this.command = { command: "tt-vscode-extension.astView.reveal", title: "Reveal", arguments: [pos] };
		}
	}
}

type AnyTreeItem = AstTreeItem | vscode.TreeItem;

export class AstTreeProvider implements vscode.TreeDataProvider<AnyTreeItem> {
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<AnyTreeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: AnyTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: AnyTreeItem): AnyTreeItem[] {
		if (!element) {
			const document = vscode.window.activeTextEditor?.document;
			if (!document || document.languageId !== "tt") {
				return [];
			}
			const analysis = analysisCache.getAnalysis(document);
			if (analysis.parseErrors) {
				return analysis.parseErrors.map((e) => {
					const item = new vscode.TreeItem(`Parse error: ${e.message}`, vscode.TreeItemCollapsibleState.None);
					item.iconPath = new vscode.ThemeIcon("error");
					return item;
				});
			}
			if (!analysis.program) {
				return [];
			}
			// A single expanded "Program" root, matching the web app's AstFlowMapper/ProgramFlowNode,
			// which always renders an explicit Program node rather than flattening its children.
			const root = new AstTreeItem(analysis.program, "Program");
			root.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
			return [root];
		}
		if (!(element instanceof AstTreeItem)) {
			return [];
		}
		return this.wrap(childrenOf(element.astNode));
	}

	private wrap(entries: ChildEntry[]): AstTreeItem[] {
		return entries.map(({ child, label }) => {
			const item = new AstTreeItem(child, label);
			item.collapsibleState =
				childrenOf(child).length > 0 ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None;
			return item;
		});
	}
}
