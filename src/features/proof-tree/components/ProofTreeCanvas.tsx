import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {ZoomIn, ZoomOut, Crosshair, ChevronLeft, ChevronRight, RotateCcw} from "lucide-react";
import {Button} from "@/shared/components/ui/button.tsx";
import {ProofTreeComponentUsingCss} from "@/features/proof-tree/components/proof-tree-using-css/ProofTreeTex.tsx";
import {TexRefExpansionProvider} from "@/features/proof-tree/components/proof-tree-using-css/TexRefExpansionContext.tsx";
import {StepBuildProvider} from "@/features/proof-tree/components/proof-tree-using-css/StepBuildContext.tsx";
import {useStepBuild} from "@/features/proof-tree/hooks/useStepBuild.ts";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";

interface ProofTreeCanvasProps {
  texTree: TexTree;
  treeKey: string;
  stepByStep?: boolean;
}

// The pan/zoom viewport shared by every read-only proof tree tab (type-theory, logic, ...).
export function ProofTreeCanvas({texTree, treeKey, stepByStep = false}: ProofTreeCanvasProps) {
  const {isRevealed, step, total, canGoNext, canGoPrev, goNext, goPrev, reset} =
    useStepBuild(texTree, treeKey, stepByStep);

  return (
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

            {stepByStep && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-lg bg-secondary/95 px-3 py-2 shadow-lg backdrop-blur">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goPrev}
                  disabled={!canGoPrev}
                  className="h-8 w-8"
                  title="Previous step"
                >
                  <ChevronLeft className="h-4 w-4"/>
                </Button>
                <span className="text-sm text-muted-foreground tabular-nums whitespace-nowrap px-1">
                  Step {step} / {total}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={goNext}
                  disabled={!canGoNext}
                  className="h-8 w-8"
                  title="Next step"
                >
                  <ChevronRight className="h-4 w-4"/>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={reset}
                  disabled={!canGoPrev}
                  className="h-8 w-8"
                  title="Restart from the goal judgement"
                >
                  <RotateCcw className="h-4 w-4"/>
                </Button>
              </div>
            )}

            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full !flex !items-center !justify-center"
              wrapperStyle={{width: '100%', height: '100%', overflow: 'hidden', minHeight: '600px'}}
            >
              <div className="flex items-center justify-center p-6">
                <TexRefExpansionProvider key={treeKey}>
                  <StepBuildProvider value={{enabled: stepByStep, isRevealed}}>
                    <ProofTreeComponentUsingCss node={texTree}/>
                  </StepBuildProvider>
                </TexRefExpansionProvider>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
