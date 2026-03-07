import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {cn} from "@/shared/lib/utils.ts";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import {motion} from "framer-motion";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Layers, Maximize2, Minimize2} from "lucide-react";
import {Ast} from "@/features/ast/components/ast/Ast.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {useRef, useState, useEffect} from "react";
export interface AstVisualisationProps {
  className?: string;
}
export function AstVisualisation({
                                   className
                                 }: AstVisualisationProps) {
  const ast = useAppSelector((state) => state.term.ast);
  const hasAst = ast !== null && ast !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error toggling fullscreen:', err);
    }
  };
  return (
    <motion.div
      ref={containerRef}
      className={cn(className, "h-full")}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-500">
                <Layers className="h-5 w-5"/>
              </div>
              <div>
                <CardTitle className="text-2xl">Abstract Syntax Tree</CardTitle>
                <CardDescription>
                  {hasAst
                    ? "Interactive visualization of the program structure"
                    : "No AST available"}
                </CardDescription>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="shrink-0"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {hasAst ? (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex-1 rounded-xl border overflow-hidden bg-muted/30">
                <Ast AST={ast}/>
              </div>
              <details className="group">
                <summary
                  className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-3 rounded-lg hover:bg-muted/50">
                  <span className="inline-flex items-center gap-2">
                    View Raw AST Data (DEBUG)
                  </span>
                </summary>
                <div className="mt-3 p-4 rounded-xl bg-muted/50 border">
                  <pre className="text-xs overflow-x-auto text-foreground/80">
                    {JSON.stringify(ast, null, 2)}
                  </pre>
                </div>
              </details>
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
