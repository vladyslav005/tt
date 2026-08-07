import {Fragment, useState} from "react";
import type {TexTree} from "@/shared/presentation/tex/texTree.ts";
import {Conclusion} from "@/features/proof-tree/components/proof-tree-using-css/Conclusion.tsx";
import {useStepBuild} from "@/features/proof-tree/components/proof-tree-using-css/StepBuildContext.tsx";
import {cn} from "@/shared/lib/utils.ts";
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
  const isDef = node.rule === "T-Def" || node.rule === "CT-Def" || node.rule === "Lemma";
  const [expanded, setExpanded] = useState(false);
  const {isRevealed} = useStepBuild();
  const revealed = isRevealed(node);

  const showCollapsedAsVar = isDef && !expanded && node.collapsedChildren !== undefined;
  const displayRule = showCollapsedAsVar ? (node.collapsedRule ?? node.rule) : node.rule;
  const displayChildren = showCollapsedAsVar ? node.collapsedChildren : node.children;

  const isItRoot = root ? "root" : "not-root";
  const isItLeaf = node.children === undefined ? 'leaf-node' : 'not-leaf-node';

  const showPremises = displayChildren !== undefined && (!isDef || expanded || showCollapsedAsVar);

  return (
    <div className='proof-node'>
      {showPremises && (
        <div className={`premises`}>
          {displayChildren!.map((premise, index) => (
            <Fragment key={`${premise.id}-${index}`}>
              <ProofTreeComponentUsingCss
                root={false}
                node={premise}/>
              {displayChildren !== undefined && index !== displayChildren.length - 1 && (
                <div className="inter-proof"></div>
              )}
            </Fragment>
          ))}
        </div>
      )}
      <div className={cn(`conclusion ${isItRoot} ${isItLeaf}`, !revealed && "step-pending")}>
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
          <p className="rule-name" title={node.ruleTooltip}>{displayRule?.replaceAll('-', ' – ')}</p>
        </div>
      </div>
    </div>
  );
}
