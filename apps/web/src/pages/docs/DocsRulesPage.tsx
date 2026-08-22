import {motion} from "framer-motion";
import {cn} from "@/shared/lib/utils.ts";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {EVALUATION_RULE_GROUPS, TYPE_RULE_GROUPS, type RuleDefinition} from "@/features/docs/rules/ruleDefinitions.ts";
import {RuleCard} from "@/features/docs/rules/RuleCard.tsx";
import {usePageMeta} from "@/shared/hooks/usePageMeta.ts";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Pairs each type-rule topic with its evaluation-rule counterpart(s) so a topic's
// "does this typecheck" and "how does it run" rules sit together on the page,
// instead of in two separate top-level buckets. Topics with no operational
// semantics of their own (logic, kinding, inference) simply have no eval groups.
const TOPIC_PAIRINGS: {typeId: string; evalIds: string[]}[] = [
  {typeId: "stlc", evalIds: ["stlc-eval"]},
  {typeId: "curry-howard", evalIds: []},
  {typeId: "data-types", evalIds: ["data-types-eval", "lists-eval"]},
  {typeId: "iso-recursive", evalIds: ["iso-recursive-eval"]},
  {typeId: "recursion", evalIds: ["recursion-eval"]},
  {typeId: "let-polymorphism", evalIds: []},
  {typeId: "system-f", evalIds: ["system-f-eval"]},
  {typeId: "system-f-omega", evalIds: []},
  {typeId: "system-lambda-p", evalIds: []},
];

function RuleGrid({rules}: {rules: RuleDefinition[]}) {
  return (
    // Two columns, not three — inference-rule formulas need real width before
    // they'll stay on one line. Dense packing backfills the gap a wide (full-row)
    // card leaves behind with the next short card instead of leaving it empty.
    <motion.div
      className="grid grid-flow-dense gap-4 lg:grid-cols-2"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {rules.map((rule) => (
        <motion.div
          key={rule.id}
          variants={fadeInUp}
          className={cn(rule.wide && "lg:col-span-2")}
        >
          <RuleCard rule={rule} className="h-full"/>
        </motion.div>
      ))}
    </motion.div>
  );
}

function RuleSubsection({label, groups}: {label: string; groups: {id: string; note?: string; rules: RuleDefinition[]}[]}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">{label}</h3>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.id}>
            {group.note && (
              <p className="text-sm text-muted-foreground mb-4 max-w-3xl leading-relaxed">{group.note}</p>
            )}
            <RuleGrid rules={group.rules}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DocsRulesPage() {
  usePageMeta(
    "Rules Reference — tt",
    "Every typing and evaluation rule referenced across the lectures, grouped by the concept that " +
    "introduces it, in the same premises-over-conclusion form the Proof Tree panel builds live.",
  );

  return (
    <div className="space-y-12">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Rules</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          Every typing and evaluation rule referenced across the lectures, grouped by the
          concept that introduces it — type rules first, then how that same construct
          evaluates. Premises sit above the line, the conclusion below — exactly like the
          derivations the Proof Tree panel builds live.
        </p>
      </motion.div>

      <div className="space-y-14">
        {TOPIC_PAIRINGS.map(({typeId, evalIds}) => {
          const typeGroup = TYPE_RULE_GROUPS.find((g) => g.id === typeId);
          if (!typeGroup) return null;
          const evalGroups = evalIds
            .map((id) => EVALUATION_RULE_GROUPS.find((g) => g.id === id))
            .filter((g): g is (typeof EVALUATION_RULE_GROUPS)[number] => g !== undefined);

          return (
            <section key={typeId}>
              <h2 className="text-xl font-bold mb-1">{typeGroup.title}</h2>
              {typeGroup.note && (
                <p className="text-sm text-muted-foreground mb-6 max-w-3xl leading-relaxed">{typeGroup.note}</p>
              )}

              <div className="space-y-8">
                <RuleSubsection label="Type Rules" groups={[typeGroup]}/>
                {evalGroups.length > 0 && (
                  <RuleSubsection label="Evaluation Rules" groups={evalGroups}/>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
