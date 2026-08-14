import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {RULE_GROUPS} from "@/features/docs/rules/ruleDefinitions.ts";
import {RuleCard} from "@/features/docs/rules/RuleCard.tsx";

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export function DocsRulesPage() {
  return (
    <div className="space-y-10">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Rule Cards</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          Every typing and evaluation rule referenced across the lectures, grouped by the
          concept that introduces it. Premises sit above the line, the conclusion below —
          exactly like the derivations the Proof Tree panel builds live.
        </p>
      </motion.div>

      {RULE_GROUPS.map((group) => (
        <section key={group.id}>
          <h2 className="text-lg font-semibold mb-1">{group.title}</h2>
          {group.note && (
            <p className="text-sm text-muted-foreground mb-4 max-w-3xl leading-relaxed">{group.note}</p>
          )}
          <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mt-4"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            {group.rules.map((rule) => (
              <motion.div key={rule.id} variants={fadeInUp}>
                <RuleCard rule={rule}/>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
