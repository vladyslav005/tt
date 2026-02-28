import {cn} from "@/shared/lib/utils.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {useProofHooks} from "@/shared/hooks/processProofHooks.ts";
import {ProofTreeComponentUsingCss} from "@/features/proof-tree/components/proof-tree-using-css/ProofTreeTex.tsx";
import {useEffect, useState} from "react";
import type {TexTree} from "@/shared/presentation/texTree.ts";

interface ProofTreeVisualisationProps {
  className?: string;
}

export function ProofTreeVisualisation({
  className
}: ProofTreeVisualisationProps) {
  const proof = useAppSelector( (state) => state.term.proof);
  const { toTexTree } = useProofHooks()

  const texTree = proof ? toTexTree(proof) : null;

  return (
    <div className={cn(className, "  border rounded-lg shadow-md p-4 m-4")}>
      <div className="absolute">
        {texTree && <ProofTreeComponentUsingCss node={texTree}/>}
      </div>
      <pre className="mt-30">
        {JSON.stringify(proof, null, 2)}
      </pre>
    </div>
  )
}