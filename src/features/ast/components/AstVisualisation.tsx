import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {cn} from "@/shared/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Layers} from "lucide-react";

export interface AstVisualisationProps {
  className?: string;
}

export function AstVisualisation({
                                   className
                                 }: AstVisualisationProps) {

  const ast = useAppSelector((state) => state.term.ast);
  const hasAst = ast !== null && ast !== undefined;

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
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-500">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-2xl">Abstract Syntax Tree</CardTitle>
              <CardDescription>
                {hasAst
                  ? "Parsed program structure visualization"
                  : "No AST available"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {hasAst ? (
            <div className="p-4 rounded-xl bg-muted/50 border overflow-x-auto">
              <pre className="text-xs text-foreground/80">
                {JSON.stringify(ast, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="p-6 text-center rounded-xl bg-muted/30 border">
              <p className="text-sm text-muted-foreground">
                Type a valid expression to generate an AST.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

}