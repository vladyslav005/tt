import {TextEditor} from "@/features/editor/components/TextEditor.tsx";
import {ProofTreeVisualisation} from "@/features/proof-tree/components/ProofTreeVisualisation.tsx";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {setTermText} from "@/shared/ui-state/termSlice.ts";
import {AstVisualisation} from "@/features/ast/components/AstVisualisation.tsx";
import {ErrorOutput} from "@/features/error-output/components/ErrorOutput.tsx";

export function MainPage() {

  const dispatch = useAppDispatch();

  return (
    <div className="">
      <div className="mt-32"></div>
      <TextEditor
        defaultValue="// Write your lambda expression here"
        className="p-4 m-4"
        height="200px"
        language="lambda"
        onChange={(value) => {
          dispatch(setTermText(value));
          console.log("Editor content changed:", value);
        }}
      />

      <div className="mt-12"></div>
      <ProofTreeVisualisation className="p-4 m-4"/>

      <div className="mt-12"></div>
      <AstVisualisation className="p-4 m-4"/>

      <div className="mt-12"></div>
      <ErrorOutput className="p-4 m-4"/>
    </div>
  )
}