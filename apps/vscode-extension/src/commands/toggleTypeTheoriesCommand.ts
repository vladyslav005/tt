import * as vscode from "vscode";
import { TYPE_THEORIES, TypeTheoryId } from "@vladyslav005/tt-core";
import { getTypeTheoryConfig, setTypeTheoryEnabled } from "../settings";

interface TheoryPickItem extends vscode.QuickPickItem {
	id: TypeTheoryId;
}

export function registerToggleTypeTheoriesCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.toggleTypeTheories", async () => {
			const current = getTypeTheoryConfig();
			const items: TheoryPickItem[] = TYPE_THEORIES.map((t) => ({
				label: t.label,
				description: t.shortLabel,
				detail: t.description,
				picked: current[t.id],
				id: t.id,
			}));
			const picked = await vscode.window.showQuickPick(items, {
				canPickMany: true,
				placeHolder: "Select type theory extensions to enable",
			});
			if (!picked) {
				return;
			}
			const pickedIds = new Set(picked.map((p) => p.id));
			await Promise.all(TYPE_THEORIES.map((t) => setTypeTheoryEnabled(t.id, pickedIds.has(t.id))));
		}),
	);
}
