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
      <div className="mt-28"></div>
      <TextEditor
        className="flex-2 p-4 m-4"
        defaultValue="a : T; (λ x : T . (x) : T -> T) a;"
        height="400px"
        language="lambda"
        onChange={(value) => {
          dispatch(setTermText(value));
          console.log("Editor content changed:", value);
        }}
      />

      <ErrorOutput className="flex-1 max-h-[400px]  h-full p-4 m-4"/>




      <div className="mt-4 flex">
        <ProofTreeVisualisation className="flex-1 p-4 m-4 "/>
        <AstVisualisation className="flex-1 p-4 m-4 "/>
      </div>

    </div>
  )
}