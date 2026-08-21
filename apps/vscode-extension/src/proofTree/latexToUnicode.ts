import { TexRegistryEntry, TexSegment, TexTree } from "@vladyslav005/tt-core";
import { UnicodeTexSegment, UnicodeTexTree } from "../webviewProtocol";

// Verified (via grep across TexMapper.ts/LogicMapper.ts/LetPolymorphismTexMapper.ts/
// GammaRegistry.ts/TypeAliasRegistry.ts) to be the complete set of LaTeX command tokens
// that actually appear in judgement text — excludes document-only tokens (\begin, \hypo,
// \infer, ...) that only appear in ebproofExport.ts, never in a TexTree's strings.
const SYMBOL_MAP: Record<string, string> = {
	Gamma: "Γ",
	Lambda: "Λ",
	lambda: "λ",
	forall: "∀",
	to: "→",
	Rightarrow: "⇒",
	vdash: "⊢",
	emptyset: "∅",
	in: "∈",
	cup: "∪",
	times: "×",
	leq: "≤",
	geq: "≥",
	neq: "≠",
	land: "∧",
	lor: "∨",
	top: "⊤",
	mu: "μ",
	Pi: "Π",
	beta: "β",
	equiv: "≡",
	mid: "∣",
	langle: "⟨",
	rangle: "⟩",
};

const SUBSCRIPT_DIGITS = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];

// Known v1 cosmetic gap: "\equiv_\beta" (the Conv leaf rule) renders as "≡_β" with a literal
// underscore, since it's a single-token subscript with no {} — the numbered-subscript step
// below only targets the "_{n}" form used by Γ_n/C_n. Not worth special-casing for plain text.
//
// Deliberately does NOT trim leading/trailing whitespace — a `judgementSegments` array splits
// one judgement into several independently-converted pieces (e.g. an App's func/arg separator
// is its own segment whose entire content is "\ "), and those pieces are concatenated by the
// webview afterward. Trimming here would reduce a separator-only segment to "", silently
// deleting exactly the space between two adjacent words. Only `latexToUnicode` (used for a
// whole judgement string, never concatenated with anything) trims.
function convertTokens(input: string): string {
	let s = input;
	s = s.replace(/\\(?:text|mathit)\{([^{}]*)\}/g, "$1");
	s = s.replace(/\\([A-Za-z]+)/g, (match, name: string) => SYMBOL_MAP[name] ?? match);
	s = s.replace(/\\([{}_])/g, "$1");
	s = s.replace(/\\[ ,]/g, " ");
	s = s.replace(/_\{(\d+)\}/g, (_match, digits: string) =>
		[...digits].map((d) => SUBSCRIPT_DIGITS[Number(d)]).join(""),
	);
	return s.replace(/ {2,}/g, " ");
}

export function latexToUnicode(input: string): string {
	return convertTokens(input).trim();
}

function toUnicodeSegment(seg: TexSegment): UnicodeTexSegment {
	return seg.kind === "tex" ? { kind: "tex", value: convertTokens(seg.value) } : { kind: "ref", key: seg.key };
}

export function toUnicodeTree(node: TexTree): UnicodeTexTree {
	return {
		judgement: latexToUnicode(node.judgement),
		judgementSegments: node.judgementSegments?.map(toUnicodeSegment),
		rule: node.rule,
		ruleTooltip: node.ruleTooltip,
		id: node.id,
		pos: node.pos,
		error: node.error,
		meta: node.meta,
		collapsedRule: node.collapsedRule,
		children: node.children?.map(toUnicodeTree),
		collapsedChildren: node.collapsedChildren?.map(toUnicodeTree),
	};
}

export function toUnicodeRegistry(
	registry: Record<string, TexRegistryEntry>,
): Record<string, { short: string; full: string }> {
	return Object.fromEntries(
		Object.entries(registry).map(([key, entry]) => [
			key,
			{ short: latexToUnicode(entry.shortTex), full: latexToUnicode(entry.fullTex) },
		]),
	);
}
