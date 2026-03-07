import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {useProofHooks} from "@/shared/hooks/processProofHooks.ts";
import {ProofTreeComponentUsingCss} from "@/features/proof-tree/components/proof-tree-using-css/ProofTreeTex.tsx";
import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Network, ZoomIn, ZoomOut, Crosshair} from "lucide-react";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import {Button} from "@/shared/components/ui/button.tsx";


interface ProofTreeVisualisationProps {
  className?: string;
}

export function ProofTreeVisualisation({
                                         className
                                       }: ProofTreeVisualisationProps) {
  const proof = useAppSelector((state) => state.term.proof);
  const {toTexTree} = useProofHooks()

  const texTree = proof ? toTexTree(proof) : null;
  const hasProof = proof !== null && proof !== undefined;

  return (
    <motion.div
      className={cn(className, "h-full max-w-full overflow-hidden")}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Proof Tree</CardTitle>
              <CardDescription>
                {hasProof
                  ? "Type derivation tree visualization"
                  : "No proof tree available"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {hasProof ? (
            <div className="w-full h-full  flex flex-col space-y-4">
              <div className="flex-1 w-full relative  rounded-xl bg-muted/30 border overflow-hidden">
                <TransformWrapper
                  initialScale={1}
                  minScale={0.1}
                  maxScale={3}
                  centerOnInit={true}
                  wheel={{step: 0.1}}
                  doubleClick={{mode: "reset"}}
                  panning={{velocityDisabled: true}}
                  limitToBounds={false}
                >
                  {({zoomIn, zoomOut, resetTransform}) => (
                    <>
                      {/* Zoom Controls */}
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
                          onClick={() => resetTransform()}
                          className="shadow-lg hover:shadow-xl transition-shadow"
                          title="Reset View"
                        >
                            <Crosshair className="h-4 w-4"/>
                        </Button>
                      </div>

                      <div className="absolute bottom-4 left-4 z-10 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg border">
                        <p>💡 Scroll to zoom • Drag to pan • Double-click to reset</p>
                      </div>

                      <TransformComponent
                        wrapperClass="!w-full !h-full"
                        contentClass="!w-full !h-full !flex !items-center !justify-center"
                        wrapperStyle={{ width: '100%', height: '100%', overflow: 'hidden', minHeight: '600px' }}
                      >
                        <div className="flex items-center justify-center p-6">
                          {texTree && <ProofTreeComponentUsingCss node={texTree}/>}
                        </div>
                      </TransformComponent>
                    </>
                  )}
                </TransformWrapper>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-muted/50">
                  <span className="inline-flex items-center gap-2">
                    {/*<span className="transform transition-transform group-open:rotate-90">▶</span>*/}
                    View Raw Proof Data (DEBUG)
                  </span>
                </summary>
                <div className="mt-3 p-4 rounded-xl bg-muted/50 border">
                  <pre className="text-xs overflow-x-auto text-foreground/80">
                    {JSON.stringify(proof, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-muted/30 border">
              <p className="text-sm text-muted-foreground">
                Type a valid expression to generate a proof tree.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

    </motion.div>

  )
}