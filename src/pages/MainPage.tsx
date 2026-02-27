import {TextEditor} from "@/features/editor/components/TextEditor.tsx";

export function MainPage() {
  return (
    <div className="">
      <div className="mt-32"></div>
      <TextEditor
        defaultValue="// Write your lambda expression here"
        className="p-4 m-4 border rounded-lg"
        height="200px"
        language="lambda"
        onChange={(value) => {
          // Handle editor content changes here
          console.log("Editor content:", value);
        }}
      />
    </div>
  )
}