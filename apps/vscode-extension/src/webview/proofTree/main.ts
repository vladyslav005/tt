import type {
	HostToProofTreeMessage,
	ProofTreePayload,
	ProofTreeToHostMessage,
	UnicodeTexTree,
} from "../../webviewProtocol";

declare function acquireVsCodeApi(): { postMessage(msg: ProofTreeToHostMessage): void };
const vscodeApi = acquireVsCodeApi();

const root = document.getElementById("root")!;
let currentRegistry: Record<string, { short: string; full: string }> = {};

window.addEventListener("message", (event: MessageEvent<HostToProofTreeMessage>) => {
	const msg = event.data;
	if (msg.type === "render") {
		render(msg.payload);
	} else {
		root.replaceChildren();
	}
});

function render(payload: ProofTreePayload): void {
	currentRegistry = payload.registry;
	root.replaceChildren();

	const toolbar = document.createElement("div");
	toolbar.className = "tt-toolbar";
	const toggle = document.createElement("button");
	toggle.textContent = "Curry-Howard view";
	toggle.className = "tt-toggle" + (payload.mode === "logic" ? " tt-toggle-active" : "");
	toggle.disabled = !payload.logicAvailable;
	toggle.title = payload.logicAvailable
		? "Switch between the automatic derivation and the Curry-Howard (propositional logic) view"
		: "Only available for a proof that doesn't use any type theory extension";
	toggle.addEventListener("click", () => {
		const nextMode = payload.mode === "logic" ? "derivation" : "logic";
		vscodeApi.postMessage({ type: "setMode", mode: nextMode });
	});
	toolbar.appendChild(toggle);
	root.appendChild(toolbar);

	root.appendChild(renderNode(payload.tree));
}

function renderNode(node: UnicodeTexTree): HTMLElement {
	const wrapper = document.createElement("div");
	wrapper.className = "tt-node" + (node.error ? " tt-node-error" : "");

	if (node.children?.length) {
		const premises = document.createElement("div");
		premises.className = "tt-premises";
		for (const child of node.children) {
			premises.appendChild(renderNode(child));
		}
		wrapper.appendChild(premises);
		const bar = document.createElement("hr");
		bar.className = "tt-bar";
		wrapper.appendChild(bar);
	}

	const conclusion = document.createElement("div");
	conclusion.className = "tt-conclusion";

	const judgement = document.createElement("span");
	judgement.className = "tt-judgement";
	if (node.judgementSegments?.length) {
		for (const seg of node.judgementSegments) {
			if (seg.kind === "tex") {
				judgement.appendChild(document.createTextNode(seg.value));
			} else {
				judgement.appendChild(renderRef(seg.key));
			}
		}
	} else {
		judgement.textContent = node.judgement;
	}
	if (node.pos) {
		judgement.classList.add("tt-clickable");
		judgement.title = "Click to reveal in the editor";
		const pos = node.pos;
		judgement.addEventListener("click", () => vscodeApi.postMessage({ type: "revealPos", pos }));
	}
	conclusion.appendChild(judgement);

	const rule = document.createElement("span");
	rule.className = "tt-rule";
	rule.textContent = node.rule;
	if (node.ruleTooltip) {
		rule.title = node.ruleTooltip;
	}
	conclusion.appendChild(rule);

	wrapper.appendChild(conclusion);

	if (node.error) {
		const error = document.createElement("div");
		error.className = "tt-node-error-text";
		error.textContent = node.error;
		wrapper.appendChild(error);
	}

	return wrapper;
}

function renderRef(key: string): HTMLElement {
	const entry = currentRegistry[key];
	const span = document.createElement("span");
	span.className = "tt-ref";
	span.textContent = entry?.short ?? key;
	let expanded = false;
	span.addEventListener("click", (event) => {
		event.stopPropagation();
		if (!entry) {
			return;
		}
		expanded = !expanded;
		span.textContent = expanded ? entry.full : entry.short;
	});
	return span;
}

vscodeApi.postMessage({ type: "ready" });
