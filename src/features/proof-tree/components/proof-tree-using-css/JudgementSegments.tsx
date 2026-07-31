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

// Renders a judgement as one combined MathJax expression (adjacent MathJax
// fragments don't share a baseline). Each Γ_n/C_n reference is wrapped in
// \href{i}{...}, clickable in place and toggled per occurrence.
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
    // MathJax's CHTML output renders \href{}{} as data-mjx-href, not a real href.
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
