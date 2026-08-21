import * as vscode from "vscode";
import { AstPrettyPrinter, GlobalDecl, kindToString, Kind, Program, Term, Type } from "@vladyslav005/tt-core";
import { analysisCache } from "../analysis";

type AnyAstNode = Program | GlobalDecl | Term | Type | Kind;

interface ChildEntry {
	child: AnyAstNode;
	label: string;
}

const printer = new AstPrettyPrinter();

const DECL_KINDS = new Set(["VarDecl", "FunDecl", "TypeAliasDecl", "TypeConstructorDecl"]);
const KIND_KINDS = new Set(["StarKind", "KindArrow"]);
const TYPE_KINDS = new Set([
	"TyIdentifier",
	"TyArrow",
	"TupleType",
	"SumType",
	"VariantType",
	"RecordType",
	"TyForall",
	"TyMetaVar",
	"TyConstructorAbs",
	"TyConstructorApp",
	"TyPi",
	"TyIndexApp",
	"ListType",
	"RecursiveType",
]);

const MAX_DESCRIPTION_LENGTH = 80;

function truncate(text: string): string {
	return text.length > MAX_DESCRIPTION_LENGTH ? `${text.slice(0, MAX_DESCRIPTION_LENGTH - 1)}…` : text;
}

function describe(node: AnyAstNode): string {
	if (node.kind === "Program") {
		return "";
	}
	if (DECL_KINDS.has(node.kind)) {
		return truncate(printer.printGlobalDecl(node as GlobalDecl));
	}
	if (KIND_KINDS.has(node.kind)) {
		return truncate(kindToString(node as Kind));
	}
	if (TYPE_KINDS.has(node.kind)) {
		return truncate(printer.printType(node as Type));
	}
	return truncate(printer.printTerm(node as Term));
}

// A hand-rolled switch (rather than a subclass of the exported AstVisitor<R>, which only
// dispatches over the Term/GlobalDecl hierarchy) — the AST tree also needs to walk into
// embedded Type and Kind nodes (Abs.paramType, TyArrow.from/to, TyConstructorAbs.paramKind, ...),
// which a single-hierarchy visitor doesn't cover.
function childrenOf(node: AnyAstNode): ChildEntry[] {
	switch (node.kind) {
		case "Program":
			return [
				...node.globals.map((g): ChildEntry => ({ child: g, label: g.name })),
				...(node.term ? [{ child: node.term, label: "result" }] : []),
			];

		// ---- GlobalDecl ----
		case "VarDecl":
		case "FunDecl":
			return [
				{ child: node.value, label: "value" },
				{ child: node.type, label: "type" },
			];
		case "TypeAliasDecl":
			return [{ child: node.type, label: "type" }];
		case "TypeConstructorDecl":
			return [{ child: node.paramKind, label: "kind" }];

		// ---- Term ----
		case "Var":
		case "Lit":
			return [];
		case "Abs":
			return [
				...(node.paramType ? [{ child: node.paramType, label: `param: ${node.param}` }] : []),
				{ child: node.body, label: "body" },
				...(node.type ? [{ child: node.type, label: "annotation" }] : []),
			];
		case "App":
			return [
				{ child: node.func, label: "func" },
				{ child: node.arg, label: "arg" },
			];
		case "VariantCase":
			return [
				{ child: node.variable, label: "scrutinee" },
				...node.cases.map((c): ChildEntry => ({ child: c.body, label: `case ${c.label} (${c.variable})` })),
			];
		case "Inl":
		case "Inr":
			return [
				{ child: node.term, label: "term" },
				{ child: node.type, label: "type" },
			];
		case "IfCondition":
			return [
				{ child: node.condition, label: "condition" },
				{ child: node.then, label: "then" },
				...(node.elif ?? []).flatMap(
					(b, i): ChildEntry[] => [
						{ child: b.condition, label: `elseif[${i}] condition` },
						{ child: b.then, label: `elseif[${i}] then` },
					],
				),
				...(node.else ? [{ child: node.else, label: "else" }] : []),
			];
		case "Case":
			return [
				{ child: node.variable, label: "scrutinee" },
				{ child: node.inl.term, label: `inl (${node.inl.variable})` },
				{ child: node.inr.term, label: `inr (${node.inr.variable})` },
			];
		case "Variant":
			return [
				{ child: node.type, label: "type" },
				...node.variants.map((v): ChildEntry => ({ child: v.term, label: v.label })),
			];
		case "Ascribe":
			return [
				{ child: node.term, label: "term" },
				{ child: node.type, label: "type" },
			];
		case "TupleProjection":
			return [{ child: node.tuple, label: "tuple" }];
		case "RecordProjection":
			return [{ child: node.term, label: "term" }];
		case "Record":
			return node.fields.map((f): ChildEntry => ({ child: f.term, label: f.label }));
		case "Sequencing":
			return [
				{ child: node.first, label: "first" },
				{ child: node.second, label: "second" },
			];
		case "Tuple":
			return node.elements.map((e, i): ChildEntry => ({ child: e, label: `[${i}]` }));
		case "DummyAbstraction":
			return [
				{ child: node.paramType, label: "param" },
				{ child: node.body, label: "body" },
				...(node.type ? [{ child: node.type, label: "annotation" }] : []),
			];
		case "Let":
			return [
				{ child: node.value, label: "value" },
				{ child: node.body, label: "body" },
			];
		case "BinOp":
			return [
				{ child: node.left, label: "left" },
				{ child: node.right, label: "right" },
			];
		case "Fix":
			return [{ child: node.term, label: "term" }];
		case "TypeAbs":
			return [{ child: node.body, label: "body" }];
		case "TypeApp":
			return [
				{ child: node.term, label: "term" },
				{ child: node.typeArg, label: "type arg" },
			];
		case "Nil":
			return [{ child: node.type, label: "type" }];
		case "Cons":
			return [
				{ child: node.type, label: "type" },
				{ child: node.head, label: "head" },
				{ child: node.tail, label: "tail" },
			];
		case "IsNil":
		case "Head":
		case "Tail":
		case "Fold":
		case "Unfold":
			return [
				{ child: node.type, label: "type" },
				{ child: node.term, label: "term" },
			];

		// ---- Type ----
		case "TyIdentifier":
		case "TyMetaVar":
			return [];
		case "TyArrow":
			return [
				{ child: node.from, label: "from" },
				{ child: node.to, label: "to" },
			];
		case "TupleType":
			return node.elements.map((e, i): ChildEntry => ({ child: e, label: `[${i}]` }));
		case "SumType":
			return [
				{ child: node.left, label: "left" },
				{ child: node.right, label: "right" },
			];
		case "VariantType":
			return node.variants.map((v): ChildEntry => ({ child: v.type, label: v.label }));
		case "RecordType":
			return node.fields.map((f): ChildEntry => ({ child: f.type, label: f.label }));
		case "TyForall":
			return [{ child: node.type, label: "body" }];
		case "TyConstructorAbs":
			return [
				{ child: node.paramKind, label: "kind" },
				{ child: node.body, label: "body" },
			];
		case "TyConstructorApp":
			return [
				{ child: node.func, label: "func" },
				{ child: node.arg, label: "arg" },
			];
		case "TyPi":
			return [
				{ child: node.paramType, label: `param: ${node.paramVar}` },
				{ child: node.body, label: "body" },
			];
		case "TyIndexApp":
			return [
				{ child: node.func, label: "func" },
				{ child: node.arg, label: "index" },
			];
		case "ListType":
			return [{ child: node.elementType, label: "element type" }];
		case "RecursiveType":
			return [{ child: node.type, label: "body" }];

		// ---- Kind ----
		case "StarKind":
			return [];
		case "KindArrow":
			return [
				{ child: node.from, label: "from" },
				{ child: node.to, label: "to" },
			];

		default:
			return [];
	}
}

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

export class AstTreeProvider implements vscode.TreeDataProvider<AstTreeItem> {
	private readonly _onDidChangeTreeData = new vscode.EventEmitter<AstTreeItem | undefined>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire(undefined);
	}

	getTreeItem(element: AstTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: AstTreeItem): AstTreeItem[] {
		if (!element) {
			const document = vscode.window.activeTextEditor?.document;
			if (!document || document.languageId !== "tt") {
				return [];
			}
			const analysis = analysisCache.getAnalysis(document);
			if (!analysis.program) {
				return [];
			}
			// A single expanded "Program" root, matching the web app's AstFlowMapper/ProgramFlowNode,
			// which always renders an explicit Program node rather than flattening its children.
			const root = new AstTreeItem(analysis.program, "Program");
			root.collapsibleState = vscode.TreeItemCollapsibleState.Expanded;
			return [root];
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
