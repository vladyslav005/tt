import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {useProofHooks} from "@/shared/hooks/processProofHooks.ts";
import {ProofTreeComponentUsingCss} from "@/features/proof-tree/components/proof-tree-using-css/ProofTreeTex.tsx";
import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {Network} from "lucide-react";


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
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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
        <CardContent>
          {hasProof ? (
            <div className="space-y-6">
              <div className="relative min-h-25 p-6 rounded-xl bg-muted/30 border overflow-x-auto">
                {texTree && <ProofTreeComponentUsingCss node={texTree}/>}
              </div>
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