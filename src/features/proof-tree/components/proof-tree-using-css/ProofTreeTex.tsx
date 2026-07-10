import {Fragment, useState} from "react";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {Conclusion} from "@/features/proof-tree/components/proof-tree-using-css/Conclusion.tsx";
import "./ProofTree.css"

interface ProofTreeUsingCssProps {
  node: TexTree,
  root?: boolean,
}

export function ProofTreeComponentUsingCss(
  {
    node,
    root = true,
  }: ProofTreeUsingCssProps,) {
  const isDef = node.rule === "T-Def";
  const [expanded, setExpanded] = useState(false);

  const isItRoot = root ? "root" : "not-root";
  const isItLeaf = node.children === undefined ? 'leaf-node' : 'not-leaf-node';

  const showPremises = node.children && (!isDef || expanded);

  return (
    <div className='proof-node'>
      {showPremises && (
        <div className={`premises`}>
          {node.children!.map((premise, index) => (
            <Fragment key={`${premise.id}-${index}`}>
              <ProofTreeComponentUsingCss
                root={false}
                node={premise}/>
              {node.children !== undefined && index !== node.children.length - 1 && (
                <div className="inter-proof"></div>
              )}
            </Fragment>
          ))}
        </div>
      )}
      <div className={`conclusion ${isItRoot} ${isItLeaf}`}>
        <div className="conclusion-left">
        </div>

        <Conclusion
          node={node}
          isItRoot={isItRoot}
          isItLeaf={isItLeaf}
          isDef={isDef}
          isExpanded={expanded}
          onToggle={() => setExpanded(e => !e)}
        />

        <div className="conclusion-right">
          <p className="rule-name">{node.rule?.replaceAll('-', ' – ')}</p>
        </div>
      </div>
    </div>
  );
}
