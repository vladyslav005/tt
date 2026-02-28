import type {TexTree} from "@/shared/presentation/texTree.ts";
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
  const isItRoot = root ? "root" : "not-root";
  const isItLeaf = node.children === undefined ? 'leaf-node' : 'not-leaf-node';

  return (
            <div className='proof-node'>
              {node.children && (
                  <div className={`premises`}
                  >
                    {node.children.map((premise, index) => (
                        <>
                          <ProofTreeComponentUsingCss
                              key={`${premise.rule}-${premise.judgement}`}
                              root={false}
                              node={premise}/>
                          {node.children !== undefined && index !== node.children.length - 1 && (
                              <div className="inter-proof"></div>
                          )}
                        </>
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
                  ></Conclusion>

                  <div className="conclusion-right">
                      <p className="rule-name">{node.rule?.replaceAll('-', ' – ')}</p>

                  </div>
              </div>
            </div>
  );
}
