import {MathJax} from "better-react-mathjax";
import {cn} from "@/shared/lib/utils.ts";
import {Card, CardContent} from "@/shared/components/ui/card.tsx";
import type {RuleDefinition} from "@/features/docs/rules/ruleDefinitions.ts";

// Deliberately mirrors the visual language of the real Proof Tree panel
// (src/features/proof-tree/components/proof-tree-using-css/ProofTree.css) —
// premises above a horizontal line, conclusion below, rule name in italic
// serif to the right — using the same MathJax rendering, not plain text.
export function RuleCard({rule, className}: {rule: RuleDefinition; className?: string}) {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="pt-6 pb-4 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center">
          {rule.premisesTex.length > 0 && (
            <div className="flex flex-wrap items-end justify-center gap-x-5 gap-y-1 border-b border-foreground/50 pb-1 px-2 [&_mjx-container]:!m-0">
              {rule.premisesTex.map((premise, i) => (
                <MathJax key={i} inline>{`\\(${premise}\\)`}</MathJax>
              ))}
            </div>
          )}
          <div className="flex items-center gap-4 pt-1.5">
            <div className="[&_mjx-container]:!m-0">
              <MathJax inline>{`\\(${rule.conclusionTex}\\)`}</MathJax>
            </div>
            <span
              className="text-sm text-muted-foreground italic whitespace-nowrap"
              style={{fontFamily: "'Times New Roman', Times, serif"}}
            >
              {rule.id}
            </span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed text-center">{rule.description}</p>
      </CardContent>
    </Card>
  );
}
