import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {checkProof, enterBuildMode, exitBuildMode} from "@/shared/ui-state/termSlice.ts";
import {countProofErrors, summarizeStudentTree} from "@/shared/ui-state/studentProof.ts";
import {ProofTreeBuilderNode} from "@/features/proof-tree/components/proof-tree-builder/ProofTreeBuilderNode.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Switch} from "@/shared/components/ui/switch.tsx";
import {Label} from "@/shared/components/ui/label.tsx";
import {cn} from "@/shared/lib/utils.ts";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {ZoomIn, ZoomOut, Crosshair} from "lucide-react";

// Top-level container for the "Build & Check" tab. Owns no derivation state
// itself (that all lives in state.term.buildMode) — just renders the
// student's tree against the frozen answer key, plus the Check Proof
// button and a summary strip.
export function ProofTreeBuilder() {
  const dispatch = useAppDispatch();
  const {studentTree, answerKey} = useAppSelector((state) => state.term.buildMode);
  const proof = useAppSelector((state) => state.term.proof);
  // Off by default — a wrong rule pick or failed check stays visually
  // neutral until the student opts in, so the tree doesn't give the answer
  // away just by looking "wrong" the instant something doesn't match.
  const [highlightMistakes, setHighlightMistakes] = useState(false);

  if (!studentTree || !answerKey) {
    const hasErrors = !proof || countProofErrors(proof) > 0;
    return (
      <div className="p-6 text-center rounded-xl bg-muted/30 border space-y-3">
        <p className="text-sm text-muted-foreground">
          {!proof
            ? "Type a valid expression first — Build & Check needs a term that already type-checks."
            : hasErrors
              ? "This term doesn't type-check yet — fix the errors first, then come back to build its proof yourself."
              : "Construct the typing derivation for the current term yourself, then check it against the real one."}
        </p>
        <Button
          size="sm"
          disabled={hasErrors}
          onClick={() => dispatch(enterBuildMode())}
        >
          Start Building
        </Button>
      </div>
    );
  }

  const summary = summarizeStudentTree(studentTree);

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/30 border">
        <p className="text-sm text-muted-foreground">
          {summary.filled}/{summary.total} node{summary.total !== 1 ? "s" : ""} filled
          {summary.filled > 0 && (
            <>
              {" — "}
              <span className={cn(summary.invalid === 0 && "text-emerald-600 dark:text-emerald-400")}>
                {summary.valid} valid
              </span>
              {summary.invalid > 0 && <span className="text-destructive">, {summary.invalid} invalid</span>}
            </>
          )}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch id="highlight-mistakes" checked={highlightMistakes} onCheckedChange={setHighlightMistakes}/>
            <Label htmlFor="highlight-mistakes" className="text-sm text-muted-foreground cursor-pointer">
              Highlight mistakes
            </Label>
          </div>
          <Button size="sm" onClick={() => dispatch(checkProof())}>Check Proof</Button>
          <Button size="sm" variant="ghost" onClick={() => dispatch(exitBuildMode())}>Exit</Button>
        </div>
      </div>

      <div className="flex-1 w-full relative rounded-xl bg-muted/30 border overflow-hidden">
        <TransformWrapper
          initialScale={1}
          minScale={0.1}
          maxScale={3}
          centerOnInit={true}
          wheel={{step: 0.1}}
          doubleClick={{mode: "zoomIn"}}
          panning={{velocityDisabled: true}}
          limitToBounds={false}
        >
          {({zoomIn, zoomOut, centerView}) => (
            <>
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => zoomIn()}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4"/>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => zoomOut()}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4"/>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => centerView()}
                  className="shadow-lg hover:shadow-xl transition-shadow"
                  title="Center View"
                >
                  <Crosshair className="h-4 w-4"/>
                </Button>
              </div>

              <div className="absolute bottom-4 left-4 z-10 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border">
                <p>💡 Scroll to zoom • Drag to pan • Double-click to zoom in</p>
              </div>

              <TransformComponent
                wrapperClass="!w-full !h-full"
                contentClass="!w-full !h-full !flex !items-center !justify-center"
                wrapperStyle={{width: "100%", height: "100%", overflow: "hidden", minHeight: "600px"}}
              >
                <div className="flex items-center justify-center p-6">
                  <ProofTreeBuilderNode
                    studentNode={studentTree}
                    answerNode={answerKey}
                    parentGamma={answerKey.gamma}
                    highlightMistakes={highlightMistakes}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
