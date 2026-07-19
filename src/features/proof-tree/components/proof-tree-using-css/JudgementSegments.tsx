import {useCallback} from "react";
import {MathJax} from "better-react-mathjax";
import type {TexRegistryEntry, TexSegment} from "@/shared/presentation/tex/texTree.ts";
import {useTexRefExpansion} from "@/features/proof-tree/components/proof-tree-using-css/TexRefExpansionContext.tsx";

interface JudgementSegmentsProps {
  segments: TexSegment[];
  registry?: Record<string, TexRegistryEntry>;
  nodeId: string;
  className?: string;
}

// Renders a judgement as ONE combined MathJax expression — never split
// across several independently-typeset spans, since adjacent MathJax
// fragments don't reliably share a baseline and cause exactly the misaligned,
// multi-row mess this replaced. Each numbered Γ_n/C_n reference is wrapped
// in \href{i}{...} (part of MathJax's core tex input, no extra extension
// needed), which MathJax renders as a real inline <a> within that same
// single typeset formula — clickable in place, perfectly aligned with its
// surroundings. The click is intercepted at the container (preventing the
// browser from actually navigating) and toggles that one occurrence only,
// keyed by this node's id plus the segment's position.
export function JudgementSegments({segments, registry, nodeId, className}: JudgementSegmentsProps) {
  const {isExpanded, toggle} = useTexRefExpansion();

  const instanceKey = (index: number) => `${nodeId}:${index}`;

  const flatTex = segments
    .map((segment, index) => {
      if (segment.kind === "tex") {
        return segment.value;
      }
      const entry = registry?.[segment.key];
      if (!entry) {
        return "";
      }
      const content = isExpanded(instanceKey(index)) ? entry.fullTex : entry.shortTex;
      return `\\href{${index}}{${content}}`;
    })
    .join("");

  const onClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) {
      return;
    }
    // MathJax's CHTML output renders \href{}{} as data-mjx-href, not a real
    // href attribute — it deliberately avoids letting the browser navigate.
    const href = anchor.getAttribute("data-mjx-href");
    if (href === null) {
      return;
    }
    const index = Number(href);
    if (!Number.isInteger(index) || segments[index]?.kind !== "ref") {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    toggle(`${nodeId}:${index}`);
  }, [segments, nodeId, toggle]);

  return (
    <span className={className} onClick={onClick}>
      <MathJax key={flatTex}>
        {`\\[ ${flatTex} \\]`}
      </MathJax>
    </span>
  );
}
