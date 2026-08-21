import * as vscode from "vscode";
import * as crypto from "crypto";

export function getNonce(): string {
	return crypto.randomBytes(16).toString("base64");
}

export function createTtWebviewPanel(
	context: vscode.ExtensionContext,
	viewType: string,
	title: string,
	scriptFile: string,
	cssFile: string,
	column: vscode.ViewColumn = vscode.ViewColumn.Beside,
): vscode.WebviewPanel {
	const panel = vscode.window.createWebviewPanel(viewType, title, column, {
		enableScripts: true,
		retainContextWhenHidden: true,
		localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "dist", "webview")],
	});
	const webview = panel.webview;
	const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", scriptFile));
	const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", "webview", cssFile));
	const nonce = getNonce();
	webview.html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
<link rel="stylesheet" href="${cssUri}">
</head>
<body>
<div id="root"></div>
<script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
	return panel;
}
