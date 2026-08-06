import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {useProofHooks} from "@/shared/hooks/processProofHooks.ts";
import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Network, Maximize2, Minimize2, AlertTriangle} from "lucide-react";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {isPlainStlc} from "@/shared/core/domain/typeTheory.ts";
import {ProofTreeCanvas} from "@/features/proof-tree/components/ProofTreeCanvas.tsx";

function countTreeErrors(node: TexTree): number {
  return (node.error ? 1 : 0) + (node.children ?? []).reduce((n, c) => n + countTreeErrors(c), 0);
}
import {Button} from "@/shared/components/ui/button.tsx";
import {useRef, useState} from "react";
import {useFullscreen} from "@/shared/hooks/useFullscreen";
import {Tabs, TabsList, TabsTrigger} from "@/shared/components/ui/tabs.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/shared/components/ui/tooltip.tsx";
import {ProofTreeBuilder} from "@/features/proof-tree/components/proof-tree-builder/ProofTreeBuilder.tsx";


interface ProofTreeVisualisationProps {
  className?: string;
}

type ProofTreeTab = "automatic" | "logic" | "build-check";

export function ProofTreeVisualisation({
                                         className
                                       }: ProofTreeVisualisationProps) {
  const proof = useAppSelector((state) => state.term.proof);
  const enabledTheories = useAppSelector((state) => state.term.enabledTheories);
  const {toTexTree, toLogicTree} = useProofHooks()
  const containerRef = useRef<HTMLDivElement>(null);
  const {isFullscreen, isPseudoFullscreen, toggle} = useFullscreen(containerRef);
  // Not Radix's <TabsContent> — mounting TransformWrapper inside it hung the tab.
  const [activeTab, setActiveTab] = useState<ProofTreeTab>("automatic");

  const showLogicTab = isPlainStlc(enabledTheories);
  const effectiveTab = activeTab === "logic" && !showLogicTab ? "automatic" : activeTab;

  const texTree = proof ? toTexTree(proof) : null;
  const logicTree = proof && showLogicTab ? toLogicTree(proof) : null;
  const hasProof = proof !== null && proof !== undefined;
  const treeErrorCount = texTree ? countTreeErrors(texTree) : 0;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        className,
        "h-full max-w-full overflow-hidden",
        isPseudoFullscreen && "fixed inset-0 z-50 m-0 h-[100dvh] w-[100dvw] overflow-auto bg-background",
      )}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col overflow-hidden">
        <CardHeader>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2 rounded-xl",
                treeErrorCount > 0 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
              )}>
                {treeErrorCount > 0
                  ? <AlertTriangle className="h-5 w-5" />
                  : <Network className="h-5 w-5" />
                }
              </div>
              <div>
                <CardTitle className="text-2xl">Proof Tree</CardTitle>
                <CardDescription>
                  {!hasProof
                    ? "No proof tree available"
                    : treeErrorCount > 0
                      ? `Type derivation contains ${treeErrorCount} error${treeErrorCount !== 1 ? "s" : ""} — hover nodes for details`
                      : "Type derivation tree visualization"
                  }
                </CardDescription>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProofTreeTab)}>
              <TabsList className="shrink-0">
                <TabsTrigger value="automatic">Automatic</TabsTrigger>
                <TabsTrigger value="build-check">Build &amp; Check</TabsTrigger>
                {showLogicTab ? (
                  <TabsTrigger value="logic">Curry–Howard correspondence</TabsTrigger>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex">
                          <TabsTrigger value="logic" disabled>Logic</TabsTrigger>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        Only available for plain STLC — turn off the active type system extensions to use it
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </TabsList>
            </Tabs>

            <Button
              size="icon"
              variant="ghost"
              onClick={toggle}
              className="shrink-0 justify-self-end"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 min-h-0 overflow-hidden">
          {effectiveTab === "build-check" ? (
            <div className="h-full overflow-auto">
              <ProofTreeBuilder/>
            </div>
          ) : !hasProof ? (
            <div className="p-6 text-center rounded-xl bg-muted/30 border">
              <p className="text-sm text-muted-foreground">
                Type a valid expression to generate a proof tree.
              </p>
            </div>
          ) : effectiveTab === "logic" ? (
            logicTree && (
              <div className="w-full h-full flex flex-col space-y-4">
                <ProofTreeCanvas texTree={logicTree} treeKey={`logic-${proof?.id ?? "none"}`}/>
                <details className="group">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-muted/50">
                    <span className="inline-flex items-center gap-2">
                      View Raw Logic Tree Data (DEBUG)
                    </span>
                  </summary>
                  <div className="mt-3 p-4 rounded-xl bg-muted/50 border">
                    <pre className="text-xs overflow-x-auto text-foreground/80">
                      {JSON.stringify(logicTree, null, 2)}
                    </pre>
                  </div>
                </details>
              </div>
            )
          ) : (
            <div className="w-full h-full  flex flex-col space-y-4">
              {texTree && <ProofTreeCanvas texTree={texTree} treeKey={proof?.id ?? "none"}/>}
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-muted/50">
                  <span className="inline-flex items-center gap-2">
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
          )}
          </div>
        </CardContent>
      </Card>

    </motion.div>

  )
}
