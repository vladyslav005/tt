import {motion} from "framer-motion";
import {cn} from "@/shared/lib/utils.ts";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {EVALUATION_RULE_GROUPS, TYPE_RULE_GROUPS, type RuleGroup} from "@/features/docs/rules/ruleDefinitions.ts";
import {RuleCard} from "@/features/docs/rules/RuleCard.tsx";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

function RuleGroupsSection({groups}: {groups: RuleGroup[]}) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.id}>
          <h3 className="text-base font-semibold mb-1">{group.title}</h3>
          {group.note && (
            <p className="text-sm text-muted-foreground mb-4 max-w-3xl leading-relaxed">{group.note}</p>
          )}
          {/* Two columns, not three — inference-rule formulas need real width before
              they'll stay on one line. Dense packing backfills the gap a wide (full-row)
              card leaves behind with the next short card instead of leaving it empty. */}
          <motion.div
            className="grid grid-flow-dense gap-4 lg:grid-cols-2 mt-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {group.rules.map((rule) => (
              <motion.div
                key={rule.id}
                variants={fadeInUp}
                className={cn(rule.wide && "lg:col-span-2")}
              >
                <RuleCard rule={rule} className="h-full"/>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}

export function DocsRulesPage() {
  return (
    <div className="space-y-12">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Rules</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          Every typing and evaluation rule referenced across the lectures, grouped by the
          concept that introduces it. Premises sit above the line, the conclusion below —
          exactly like the derivations the Proof Tree panel builds live.
        </p>
      </motion.div>

      <div>
        <h2 className="text-xl font-bold mb-1">Type Rules</h2>
        <p className="text-sm text-muted-foreground mb-6">Does this term/type make sense, and what does it mean?</p>
        <RuleGroupsSection groups={TYPE_RULE_GROUPS}/>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-1">Evaluation Rules</h2>
        <p className="text-sm text-muted-foreground mb-6">How does a well-typed term actually run?</p>
        <RuleGroupsSection groups={EVALUATION_RULE_GROUPS}/>
      </div>
    </div>
  );
}
