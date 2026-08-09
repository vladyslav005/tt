import {TextEditor} from "@/features/editor/components/TextEditor.tsx";
import {ProofTreeVisualisation} from "@/features/proof-tree/components/ProofTreeVisualisation.tsx";
import {useAppDispatch, useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {exitBuildMode, setTermText} from "@/shared/ui-state/termSlice.ts";
import {AstVisualisation} from "@/features/ast/components/AstVisualisation.tsx";
import {ErrorOutput} from "@/features/error-output/components/ErrorOutput.tsx";
import {useRef} from "react";
import type {TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";
import {EvaluationVisualisation} from "@/features/evaluation/components/EvaluationVisualisation.tsx";
import {Button} from "@/shared/components/ui/button.tsx";

export function MainPage() {

  const dispatch = useAppDispatch();
  const editorRef = useRef<TextEditorHandle>(null);
  const buildModeActive = useAppSelector((state) => state.term.buildMode.active);
  const termText = useAppSelector((state) => state.term.termText);

  // TODO : FORWARD PARSE ERRORS
  return (
    <div className="">
      <div className="mt-28"></div>

      {buildModeActive && (
        <div className="mx-4 mb-4 p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 flex items-center justify-between gap-3">
          <p className="text-sm">
            Building proof for: <code className="font-mono">{termText}</code>
          </p>
          <Button size="sm" variant="outline" onClick={() => dispatch(exitBuildMode())}>Edit term</Button>
        </div>
      )}

      <TextEditor
        ref={editorRef}
        className="flex-2 p-4 m-4"
        defaultValue={termText ?? "a : T; (λ x : T . (x) ) a;"}
        height="400px"
        language="lambda"
        readOnly={buildModeActive}
        onChange={(value: string | undefined) => {
          dispatch(setTermText(value));
          console.log("Editor content changed:", value);
        }}
      />

      <ErrorOutput className="flex-1 h-full p-4 m-4"/>

      <EvaluationVisualisation className="flex-1 p-4 m-4"></EvaluationVisualisation>

      <ProofTreeVisualisation className="flex-1 p-4 m-4 "/>

      <AstVisualisation className="flex-1 p-4 m-4 " editorRef={editorRef}/>

    </div>
  )
}