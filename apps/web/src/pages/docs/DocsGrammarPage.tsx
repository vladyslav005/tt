import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {EBNF_GRAMMAR, EBNF_PRECEDENCE_NOTES} from "@/features/docs/grammar/ebnf.ts";
import {NOTATION_SYMBOLS, TYPED_SYMBOLS, type SymbolEntry} from "@/features/docs/grammar/symbolGlossary.ts";
import {usePageMeta} from "@/shared/hooks/usePageMeta.ts";

function SymbolTable({symbols, showHowToType}: {symbols: SymbolEntry[]; showHowToType: boolean}) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-2.5 font-medium">Symbol</th>
            <th className="px-4 py-2.5 font-medium">Name</th>
            <th className="px-4 py-2.5 font-medium">Meaning</th>
            {showHowToType && <th className="px-4 py-2.5 font-medium">How to type it</th>}
          </tr>
        </thead>
        <tbody>
          {symbols.map((entry) => (
            <tr key={entry.symbol} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
              <td className="px-4 py-2.5 font-mono text-base whitespace-nowrap">{entry.symbol}</td>
              <td className="px-4 py-2.5 whitespace-nowrap">{entry.name}</td>
              <td className="px-4 py-2.5 text-muted-foreground leading-relaxed">{entry.meaning}</td>
              {showHowToType && (
                <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {entry.howToType}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocsGrammarPage() {
  usePageMeta(
    "Grammar & Symbols — tt",
    "The full EBNF grammar the parser accepts, plus every special symbol used in the editor and in " +
    "rendered judgements and proof trees, with how to type each one.",
  );

  return (
    <div className="space-y-10">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <h1 className="text-3xl font-bold">Grammar & Symbols</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed">
          The full grammar the parser accepts, in EBNF, plus every special symbol used
          across the app — split into what you actually type into the editor and what
          the app renders for you in judgements and proof trees.
        </p>
      </motion.div>

      <motion.section initial="initial" animate="animate" variants={fadeInUp}>
        <h2 className="text-lg font-semibold mb-4">Grammar (EBNF)</h2>
        <Card>
          <CardContent className="pt-6">
            <pre className="text-xs sm:text-[13px] leading-relaxed overflow-x-auto font-mono">
              {EBNF_GRAMMAR}
            </pre>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section initial="initial" animate="animate" variants={fadeInUp}>
        <h2 className="text-lg font-semibold mb-4">Precedence</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {EBNF_PRECEDENCE_NOTES.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle className="text-base">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-1.5 text-sm text-muted-foreground">
                  {group.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      <motion.section initial="initial" animate="animate" variants={fadeInUp}>
        <h2 className="text-lg font-semibold mb-1">Symbols you type</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">
          Part of the language itself. In the editor, type a backslash followed by the
          name shown below and pick the completion — it inserts the real character.
        </p>
        <SymbolTable symbols={TYPED_SYMBOLS} showHowToType/>
      </motion.section>

      <motion.section initial="initial" animate="animate" variants={fadeInUp}>
        <h2 className="text-lg font-semibold mb-1">Notation you'll see</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl leading-relaxed">
          Used when the app displays judgements, proof trees, and rules — not part
          of the term/type grammar, so you never type these into the editor.
        </p>
        <SymbolTable symbols={NOTATION_SYMBOLS} showHowToType={false}/>
      </motion.section>
    </div>
  );
}
