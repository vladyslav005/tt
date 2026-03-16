import {TextEditor} from "@/features/editor/components/TextEditor.tsx";
import {ProofTreeVisualisation} from "@/features/proof-tree/components/ProofTreeVisualisation.tsx";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {setTermText} from "@/shared/ui-state/termSlice.ts";
import {AstVisualisation} from "@/features/ast/components/AstVisualisation.tsx";
import {ErrorOutput} from "@/features/error-output/components/ErrorOutput.tsx";
import {AstEditorContainer} from "@/features/ast/components/ast-editor/AstEditorContainer.tsx";
import {useRef} from "react";
import type {TextEditorHandle} from "@/features/editor/components/TextEditor.tsx";

export function MainPage() {

  const dispatch = useAppDispatch();
  const editorRef = useRef<TextEditorHandle>(null);

  // TODO : FORWARD PARSE ERRORS
  return (
    <div className="">
      <div className="mt-28"></div>
      <TextEditor
        ref={editorRef}
        className="flex-2 p-4 m-4"
        defaultValue="a : T; (λ x : T . (x) ) a;"
        height="400px"
        language="lambda"
        onChange={(value) => {
          dispatch(setTermText(value));
          console.log("Editor content changed:", value);
        }}
      />
      <AstEditorContainer className="p-4 m-4" editorRef={editorRef}></AstEditorContainer>


      <ErrorOutput className="flex-1 h-full p-4 m-4"/>

      <div className="mt-4 flex md:flex-row flex-col">
        <ProofTreeVisualisation className="flex-1 p-4 m-4 "/>
        <AstVisualisation className="flex-1 p-4 m-4 "/>
      </div>
    </div>
  )
}