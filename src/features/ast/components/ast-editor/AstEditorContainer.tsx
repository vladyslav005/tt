import {useRef, useState} from "react";
import {motion} from "framer-motion";
import {cn} from "@/shared/lib/utils.ts";
import {fadeInUp} from "@/features/error-output/components/ErrorOutput.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/components/ui/card.tsx";
import { ListTree, Maximize2, Minimize2, Copy, ClipboardPaste} from "lucide-react";
import {Button} from "@/shared/components/ui/button.tsx";
import type {Program} from "@/shared/core/domain/ast";
import {AstEditor} from "@/features/ast/components/ast-editor/AstEditor.tsx";
import type {RefObject} from "react";
import type {TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";
import {astToText} from "@/shared/presentation/AstPrettyPrinter.ts";
import {useFullscreen} from "@/shared/hooks/useFullscreen";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import type {AstFlowGraph} from "@/shared/presentation/flow/types.ts";
import {useMapAstToFlow} from "@/features/ast/hooks/mapAstToFlow.ts";
import {layoutAstFlow} from "@/features/ast/hooks/layoutAstFlow.ts";
import { ReactFlowProvider } from "@xyflow/react";


export interface AstEditorProps {
  className: string,
  editorRef?: RefObject<TextEditorHandle | null>,
}

export function AstEditorContainer({
  className,
  editorRef,

}: AstEditorProps) {

  const [ast, setAst] = useState<Program>({
    id: "program-initial",
    kind: "Program",
    globals: [],
  });

  const hasAst = ast !== null && ast !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const {isFullscreen, isPseudoFullscreen, toggle} = useFullscreen(containerRef);

  const viewerAST = useAppSelector(state => state.term.ast);

  const { mapAstToFlow } = useMapAstToFlow();
  const [graph, setGraph] = useState<AstFlowGraph>({ nodes: [{
      id:"origin",
      type: "program",
      position: { x: 0, y: 0 },
      data: {
        term: ast
      }
    }
    ], edges: [] });

  const copyAstText = async () => {
    try {
      const text = astToText(ast);
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.error("Failed to copy AST text", e);
    }
  };

  const pasteAstToEditor = () => {
    try {
      const text = astToText(ast);
      editorRef?.current?.setValue(text);
    } catch (e) {
      console.error("Failed to paste AST into editor", e);
    }
  };

  const copyFromViewer = () => {
    if (viewerAST) {
      // viewerAST.id = "origin"
      setAst(viewerAST)
      const newGraph = mapAstToFlow(viewerAST);
      newGraph.nodes.forEach((node) => {node.data.editable = true;});
      const layoutGraph = layoutAstFlow(newGraph.nodes, newGraph.edges);
      if (newGraph) {
        setGraph(layoutGraph);
      }
    }
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        className,
        "h-full",
        isPseudoFullscreen && "fixed inset-0 z-50 m-0 h-[100dvh] w-[100dvw] overflow-auto bg-background",
      )}
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-500">
                <ListTree className="h-5 w-5"/>
              </div>
              <div>
                <CardTitle className="text-2xl">Abstract Syntax Tree Editor</CardTitle>
                <CardDescription>
                  {hasAst
                    ? "Interactive visualization of the program structure"
                    : "No AST available"}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={copyAstText} title="Copy AST as text">
                <Copy className="h-4 w-4 mr-2" />
                Copy text
              </Button>
              <Button size="sm" variant="secondary" onClick={pasteAstToEditor} disabled={!editorRef?.current} title="Paste AST text into editor">
                <ClipboardPaste className="h-4 w-4 mr-2" />
                Paste to editor
              </Button>
              <Button size="sm" variant="secondary" onClick={copyFromViewer} disabled={!viewerAST} title="Paste AST text into editor">
                <ClipboardPaste className="h-4 w-4 mr-2" />
                Copy from viewer
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={toggle}
                className="shrink-0"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          {hasAst ? (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex-1 rounded-xl border overflow-hidden bg-muted/30">
                <ReactFlowProvider>
                  <AstEditor graph={graph} setGraph={setGraph} AST={ast} setAST={setAst} fullScreen={isFullscreen}/>
                </ReactFlowProvider>
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
  );
}