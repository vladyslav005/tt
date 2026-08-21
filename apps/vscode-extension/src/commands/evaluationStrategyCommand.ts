import * as vscode from "vscode";
import { EVALUATION_STRATEGY_LABELS, EvaluationStrategy } from "@vladyslav005/tt-core";
import { getEvaluationStrategy, setEvaluationStrategy } from "../settings";

interface StrategyPickItem extends vscode.QuickPickItem {
	strategy: EvaluationStrategy;
}

export function registerEvaluationStrategyCommand(context: vscode.ExtensionContext): void {
	context.subscriptions.push(
		vscode.commands.registerCommand("tt-vscode-extension.chooseEvaluationStrategy", async () => {
			const current = getEvaluationStrategy();
			const items: StrategyPickItem[] = Object.values(EvaluationStrategy).map((s) => ({
				label: EVALUATION_STRATEGY_LABELS[s],
				description: s === current ? "(current)" : undefined,
				strategy: s,
			}));
			const picked = await vscode.window.showQuickPick(items, { placeHolder: "Choose evaluation strategy" });
			if (!picked) {
				return;
			}
			await setEvaluationStrategy(picked.strategy);
		}),
	);
}
