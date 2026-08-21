import { hierarchy, tree, type HierarchyPointNode } from "d3-hierarchy";
import { select } from "d3-selection";
import { zoom, ZoomTransform } from "d3-zoom";
import type {
	AstGraphNode,
	AstGraphPayload,
	AstGraphToHostMessage,
	HostToAstGraphMessage,
} from "../../webviewProtocol";

declare function acquireVsCodeApi(): { postMessage(msg: AstGraphToHostMessage): void };
const vscodeApi = acquireVsCodeApi();

const SVG_NS = "http://www.w3.org/2000/svg";
const NODE_WIDTH = 200;
const NODE_HEIGHT = 54;
const DX = 220;
const DY = 100;
const MAX_LINE_LENGTH = 28;
const MIN_FIT_SCALE = 0.6;

const root = document.getElementById("root")!;
let svgEl: SVGSVGElement | undefined;
let viewport: SVGGElement | undefined;
let zoomBehavior: ReturnType<typeof zoom<SVGSVGElement, unknown>> | undefined;
let fitObserver: ResizeObserver | undefined;

window.addEventListener("message", (event: MessageEvent<HostToAstGraphMessage>) => {
	const msg = event.data;
	if (msg.type === "render") {
		render(msg.payload);
	} else if (msg.type === "invalid") {
		fitObserver?.disconnect();
		renderMessage("Fix the error below to see the AST diagram:", msg.messages);
	} else {
		fitObserver?.disconnect();
		root.replaceChildren();
	}
});

function renderMessage(note: string, errors: string[]): void {
	root.replaceChildren();
	const container = document.createElement("div");
	container.className = "tt-fallback";
	const noteEl = document.createElement("div");
	noteEl.className = "tt-note";
	noteEl.textContent = note;
	container.appendChild(noteEl);
	for (const message of errors) {
		const errorEl = document.createElement("div");
		errorEl.className = "tt-error";
		errorEl.textContent = message;
		container.appendChild(errorEl);
	}
	root.appendChild(container);
}

function truncateLine(text: string): string {
	return text.length > MAX_LINE_LENGTH ? `${text.slice(0, MAX_LINE_LENGTH - 1)}…` : text;
}

function svgElement<K extends keyof SVGElementTagNameMap>(tag: K): SVGElementTagNameMap[K] {
	return document.createElementNS(SVG_NS, tag);
}

function render(payload: AstGraphPayload): void {
	fitObserver?.disconnect();
	root.replaceChildren();

	const svg = svgElement("svg");
	svg.classList.add("tt-svg");
	svgEl = svg;

	const viewportEl = svgElement("g");
	viewportEl.classList.add("tt-viewport");
	svg.appendChild(viewportEl);
	viewport = viewportEl;
	root.appendChild(svg);

	const hierarchyRoot = hierarchy<AstGraphNode>(payload.tree, (n) => n.children);
	const laidOut = tree<AstGraphNode>().nodeSize([DX, DY])(hierarchyRoot);

	const edgesGroup = svgElement("g");
	edgesGroup.classList.add("tt-edges");
	viewportEl.appendChild(edgesGroup);
	for (const link of laidOut.links()) {
		edgesGroup.appendChild(renderLink(link.source, link.target));
	}

	const nodesGroup = svgElement("g");
	nodesGroup.classList.add("tt-nodes");
	viewportEl.appendChild(nodesGroup);
	for (const node of laidOut.descendants()) {
		nodesGroup.appendChild(renderNode(node));
	}

	zoomBehavior = zoom<SVGSVGElement, unknown>()
		.scaleExtent([0.1, 3])
		.on("zoom", (event) => {
			viewportEl.setAttribute("transform", event.transform.toString());
		});
	select(svg).call(zoomBehavior);

	// Same background-tab guard as the Proof Tree panel: `svg`'s size is 0 while this panel
	// isn't the visible tab, and stays 0 until it's actually shown — fit exactly once, the
	// first time a real size appears (becoming visible, or an actual resize).
	let fitted = false;
	const attemptFit = () => {
		if (fitted || svg.clientWidth === 0 || svg.clientHeight === 0) {
			return;
		}
		fitToView(laidOut);
		fitted = true;
		fitObserver?.disconnect();
	};
	fitObserver = new ResizeObserver(attemptFit);
	fitObserver.observe(svg);
	attemptFit();
}

function renderLink(source: HierarchyPointNode<AstGraphNode>, target: HierarchyPointNode<AstGraphNode>): SVGPathElement {
	const sx = source.x;
	const sy = source.y + NODE_HEIGHT / 2;
	const tx = target.x;
	const ty = target.y - NODE_HEIGHT / 2;
	const my = (sy + ty) / 2;
	const path = svgElement("path");
	path.classList.add("tt-link");
	path.setAttribute("d", `M${sx},${sy} C${sx},${my} ${tx},${my} ${tx},${ty}`);
	return path;
}

function renderNode(node: HierarchyPointNode<AstGraphNode>): SVGGElement {
	const data = node.data;
	const g = svgElement("g");
	g.classList.add("tt-node", `tt-cat-${data.category}`);
	if (data.pos) {
		g.classList.add("tt-hoverable");
	}
	g.setAttribute("transform", `translate(${node.x},${node.y})`);

	const title = svgElement("title");
	title.textContent = data.description ? `${data.label}\n${data.description}` : data.label;
	g.appendChild(title);

	const rect = svgElement("rect");
	rect.classList.add("tt-node-rect");
	rect.setAttribute("x", String(-NODE_WIDTH / 2));
	rect.setAttribute("y", String(-NODE_HEIGHT / 2));
	rect.setAttribute("width", String(NODE_WIDTH));
	rect.setAttribute("height", String(NODE_HEIGHT));
	rect.setAttribute("rx", "6");
	g.appendChild(rect);

	const labelText = svgElement("text");
	labelText.classList.add("tt-node-label");
	labelText.setAttribute("y", data.description ? "-6" : "4");
	labelText.textContent = truncateLine(data.label);
	g.appendChild(labelText);

	if (data.description) {
		const descText = svgElement("text");
		descText.classList.add("tt-node-desc");
		descText.setAttribute("y", "14");
		descText.textContent = truncateLine(data.description);
		g.appendChild(descText);
	}

	if (data.pos) {
		const pos = data.pos;
		g.addEventListener("mouseenter", () => vscodeApi.postMessage({ type: "hoverPos", pos }));
		g.addEventListener("mouseleave", () => vscodeApi.postMessage({ type: "unhoverPos" }));
	}

	return g;
}

function fitToView(laidOut: HierarchyPointNode<AstGraphNode>): void {
	if (!svgEl || !zoomBehavior) {
		return;
	}
	const nodes = laidOut.descendants();
	const minX = Math.min(...nodes.map((n) => n.x)) - NODE_WIDTH / 2;
	const maxX = Math.max(...nodes.map((n) => n.x)) + NODE_WIDTH / 2;
	const minY = Math.min(...nodes.map((n) => n.y)) - NODE_HEIGHT / 2;
	const maxY = Math.max(...nodes.map((n) => n.y)) + NODE_HEIGHT / 2;
	const treeWidth = maxX - minX;
	const treeHeight = maxY - minY;

	const viewportWidth = svgEl.clientWidth;
	const viewportHeight = svgEl.clientHeight;
	const padding = 40;
	// Never auto-shrink below this — a large AST would otherwise be scaled down until its
	// (already-truncated) node labels become illegible. Panning handles what doesn't fit.
	const scale = Math.max(
		Math.min((viewportWidth - padding * 2) / treeWidth, (viewportHeight - padding * 2) / treeHeight, 1),
		MIN_FIT_SCALE,
	);
	const tx = viewportWidth / 2 - scale * (minX + treeWidth / 2);
	const ty = padding - scale * minY;

	const transform = new ZoomTransform(scale, tx, ty);
	select(svgEl).call(zoomBehavior.transform, transform);
}

vscodeApi.postMessage({ type: "ready" });
