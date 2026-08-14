import type {ReactNode} from "react";
import {Link} from "react-router-dom";
import {ArrowRight, Sparkles} from "lucide-react";
import {RuleCard} from "@/features/docs/rules/RuleCard.tsx";
import {findRule} from "@/features/docs/rules/ruleDefinitions.ts";

// Chapter-level heading (Syntax / Typing / Semantics); ConceptSection nests under it.
export function SectionHeading({index, title, blurb}: {index: string; title: string; blurb: string}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-base font-bold">
        {index}
      </span>
      <div className="pt-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">{blurb}</p>
      </div>
    </div>
  );
}

export function ConceptSection({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className="space-y-3 border-l-2 border-primary/20 pl-5 ml-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">{children}</div>
    </section>
  );
}

export interface PipelineStep {
  label: string;
  detail: string;
}

export function PipelineDiagram({steps}: {steps: PipelineStep[]}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-3 rounded-xl border bg-muted/10 p-4">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-background px-4 py-2.5 min-w-[7rem] text-center">
            <span className="text-sm font-semibold">{step.label}</span>
            <span className="text-xs text-muted-foreground">{step.detail}</span>
          </div>
          {i < steps.length - 1 && <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mx-1"/>}
        </div>
      ))}
    </div>
  );
}

// Unlabeled example rule, teaching the premises/line/conclusion convention before real ones show up.
export function RuleAnatomy() {
  return (
    <div className="rounded-xl border bg-muted/10 p-4 flex flex-col items-center gap-1.5">
      <span className="text-sm text-muted-foreground">premise 1&nbsp;&nbsp;&nbsp;&nbsp;premise 2&nbsp;&nbsp;&nbsp;&nbsp;...</span>
      <div className="flex items-center gap-2 w-full max-w-xs">
        <div className="flex-1 border-t border-foreground/50"/>
        <span className="text-xs italic text-muted-foreground whitespace-nowrap">rule name</span>
      </div>
      <span className="text-sm font-medium">conclusion</span>
      <p className="text-xs text-muted-foreground text-center mt-2 max-w-sm leading-relaxed">
        Read bottom-up: <strong>if</strong> every premise above the line holds,{" "}
        <strong>then</strong> the conclusion below it holds. The italic label is just the rule's
        name — like a citation, not part of the logic.
      </p>
    </div>
  );
}

export function TryItBox({steps}: {steps: ReactNode[]}) {
  return (
    <div className="rounded-xl border bg-muted/20 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-3">Try it</p>
      <ol className="space-y-2.5 text-sm">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {i + 1}
            </span>
            <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function RuleCardStrip({ruleIds}: {ruleIds: string[]}) {
  const rules = ruleIds.map(findRule).filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Rules</p>
        <Link to="/docs/rules" className="text-xs text-muted-foreground hover:text-foreground hover:underline">
          Full reference →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule}/>
        ))}
      </div>
    </div>
  );
}

// Introduces one piece of the app's own UI at a time — a small aside, not a manual dump.
export function Callout({title, children}: {title: string; children: ReactNode}) {
  return (
    <div className="flex gap-3 rounded-xl border border-primary/25 bg-primary/[0.04] p-4">
      <Sparkles className="h-4 w-4 shrink-0 text-primary mt-0.5"/>
      <div className="text-sm space-y-1">
        <p className="font-semibold text-foreground">{title}</p>
        <div className="text-muted-foreground leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function GrammarBox({grammar, title = "Grammar covered so far"}: {grammar: string; title?: string}) {
  return (
    <div className="rounded-xl border bg-muted/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">{title}</p>
      <pre className="font-mono text-sm overflow-x-auto leading-relaxed">{grammar}</pre>
    </div>
  );
}

export interface SummaryPoint {
  label: string;
  detail: string;
}

export function SummaryBox({points, next}: {points: SummaryPoint[]; next?: ReactNode}) {
  return (
    <div className="rounded-xl border bg-muted/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Summary</p>
      <ul className="space-y-1.5 text-sm">
        {points.map((point) => (
          <li key={point.label}>
            <strong className="text-foreground">{point.label}</strong>{" "}
            <span className="text-muted-foreground">— {point.detail}</span>
          </li>
        ))}
      </ul>
      {next && <p className="text-sm text-muted-foreground mt-3 pt-3 border-t">{next}</p>}
    </div>
  );
}

export interface ReferenceEntry {
  label: string;
  href: string;
}

export function ReferenceList({entries}: {entries: ReferenceEntry[]}) {
  return (
    <div className="rounded-xl border bg-muted/10 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Further reading</p>
      <ul className="space-y-1.5 text-sm">
        {entries.map((entry) => (
          <li key={entry.href}>
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
