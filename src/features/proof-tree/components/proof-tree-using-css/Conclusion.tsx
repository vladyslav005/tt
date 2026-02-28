import type {TexTree} from "@/shared/presentation/texTree.ts";
import {MathJax} from "better-react-mathjax";
import "./ProofTree.css"

interface ConclusionCenterProps {
  isItLeaf: string;
  isItRoot: string;
  node: TexTree;
}

export const Conclusion = (props: ConclusionCenterProps) => {

  return (
    <div className={`conclusion-center ${props.isItLeaf} ${props.isItRoot} flex items-center`}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}

    >
      <MathJax className="">
        {`\\[ ${props.node.judgement} \\]`}
      </MathJax>
    </div>
  )
}