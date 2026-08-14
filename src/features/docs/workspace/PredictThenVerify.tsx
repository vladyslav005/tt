import {useState} from "react";
import {Check, X} from "lucide-react";
import {MathJax} from "better-react-mathjax";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {useMiniWorkspace} from "@/features/docs/workspace/useMiniWorkspace.ts";

interface PredictThenVerifyProps {
  term: string;
  prompt?: string;
}

// Loose match on purpose — comparing against a hand-typed guess, not re-parsing it.
const normalize = (s: string) => s.replace(/[()\s]/g, "");

export function PredictThenVerify({term, prompt = "What type does this term have?"}: PredictThenVerifyProps) {
  const {check, result, error, checked} = useMiniWorkspace(term);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);

  const reveal = () => {
    setRevealed(true);
    check();
  };

  const reset = () => {
    setRevealed(false);
    setGuess("");
  };

  const matches = revealed && !!result && normalize(guess) === normalize(result.typeText);

  return (
    <div className="rounded-xl border bg-muted/20 p-4 space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">Checkpoint — predict, then verify</p>

      <pre className="font-mono text-sm rounded-md border bg-background p-3 overflow-x-auto">{term}</pre>

      <p className="text-sm text-muted-foreground">{prompt}</p>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="e.g. Bool -> Bool"
          className="max-w-xs font-mono"
          disabled={revealed}
        />
        {revealed ? (
          <Button size="sm" variant="ghost" onClick={reset}>Try again</Button>
        ) : (
          <Button size="sm" onClick={reveal}>Reveal</Button>
        )}
      </div>

      {revealed && checked && (
        result ? (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {matches ? <Check className="h-4 w-4 text-emerald-500"/> : <X className="h-4 w-4 text-amber-500"/>}
            <span className="text-muted-foreground">Actual type:</span>
            <MathJax inline>{`\\(${result.typeTex}\\)`}</MathJax>
            {!matches && (
              <span className="text-xs text-muted-foreground">(compare loosely — parens/spacing don't matter)</span>
            )}
          </div>
        ) : (
          <p className="text-sm text-destructive">{error}</p>
        )
      )}
    </div>
  );
}
