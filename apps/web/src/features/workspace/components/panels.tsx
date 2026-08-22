import type {RefObject} from "react";
import type {IDockviewPanelProps} from "dockview-react";
import {TextEditor, type TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";
import {ErrorOutput} from "@/features/error-output/components/ErrorOutput.tsx";
import {EvaluationVisualisation} from "@/features/evaluation/components/EvaluationVisualisation.tsx";
import {ProofTreeVisualisation} from "@/features/proof-tree/components/ProofTreeVisualisation.tsx";
import {AstVisualisation} from "@/features/ast/components/AstVisualisation.tsx";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {setTermText} from "@/shared/ui-state/termSlice.ts";

export interface EditorPanelParams {
  editorRef: RefObject<TextEditorHandle | null>;
}

export function EditorPanel({params}: IDockviewPanelProps<EditorPanelParams>) {
  const dispatch = useAppDispatch();
  const buildModeActive = useAppSelector((state) => state.term.buildMode.active);
  const termText = useAppSelector((state) => state.term.termText);

  return (
    <div className="h-full p-2">
      <TextEditor
        // eslint-disable-next-line react-hooks/refs -- ref created via useRef in AppLayout, threaded through dockview panel params
        ref={params.editorRef}
        className="h-full"
        defaultValue={termText ?? "a : T; (λ x : T . (x) ) a;"}
        height="100%"
        language="lambda"
        readOnly={buildModeActive}
        onChange={(value) => dispatch(setTermText(value))}
      />
    </div>
  );
}

export function ErrorOutputPanel() {
  return (
    <div className="h-full overflow-auto p-2">
      <ErrorOutput className="h-full"/>
    </div>
  );
}

export function EvaluationPanel() {
  return (
    <div className="h-full overflow-auto p-2">
      <EvaluationVisualisation className="h-full"/>
    </div>
  );
}

export function ProofTreePanel({params}: IDockviewPanelProps<EditorPanelParams>) {
  return (
    <div className="h-full overflow-auto p-2">
      <ProofTreeVisualisation className="h-full" editorRef={params.editorRef}/>
    </div>
  );
}

export function AstPanel({params}: IDockviewPanelProps<EditorPanelParams>) {
  return (
    <div className="h-full overflow-auto p-2">
      <AstVisualisation className="h-full" editorRef={params.editorRef}/>
    </div>
  );
}
