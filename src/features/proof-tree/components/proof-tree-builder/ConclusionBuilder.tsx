import {useCallback, useState} from "react";
import {MathJax} from "better-react-mathjax";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {setNodeType} from "@/shared/ui-state/termSlice.ts";
import {Popover, PopoverAnchor, PopoverContent} from "@/shared/components/ui/popover.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {cn} from "@/shared/lib/utils.ts";
import type {TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {type DraftType, draftToType, TypeSlotPicker, typeToDraft} from "@/features/proof-tree/components/proof-tree-builder/TypeSlotPicker.tsx";

interface ConclusionBuilderProps {
  studentNode: StudentProofNode;
  answerNode: ProofTree;
  // Rule chosen and valid, and (if this rule has premises) every revealed
  // premise already has a written type — mirrors the design's "once all of
  // a node's premises are closed, its own ? becomes eligible to fill".
  typeSlotUnlocked: boolean;
}

function gammaTex(gamma: Record<string, Type | TypeScheme>): string {
  const entries = Object.entries(gamma);
  if (entries.length === 0) return "\\emptyset";
  return entries
    .map(([name, type]) => `${name}:${TexMapper.typeToTex(type)}`)
    .join(", ");
}

// Renders one node's judgement as a single combined MathJax expression —
// same reasoning as JudgementSegments.tsx's own comment (adjacent MathJax
// fragments don't share a baseline) — with the "?"/written-type slot
// wrapped in \href{0}{...} so MathJax renders it as a real, clickable <a>,
// exactly the technique the automatic view already uses for its Γ_n
// references (JudgementSegments.tsx), just scoped to one placeholder.
export function ConclusionBuilder({studentNode, answerNode, typeSlotUnlocked}: ConclusionBuilderProps) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<DraftType | null>(null);

  const termTex = TexMapper.termToTex(answerNode.term);
  const rhsTex = studentNode.writtenType
    ? TexMapper.typeToTex(studentNode.writtenType)
    : "?";
  const judgement = `${gammaTex(answerNode.gamma)} \\vdash ${termTex} : ${typeSlotUnlocked ? `\\href{0}{${rhsTex}}` : rhsTex}`;

  const openEditor = useCallback(() => {
    setDraft(studentNode.writtenType ? typeToDraft(studentNode.writtenType) : null);
    setOpen(true);
  }, [studentNode.writtenType]);

  const onJudgementClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!typeSlotUnlocked) return;
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    // MathJax's CHTML output renders \href{}{} as data-mjx-href, not a real
    // href — see JudgementSegments.tsx for the same technique/comment.
    if (anchor.getAttribute("data-mjx-href") === null) return;
    e.preventDefault();
    e.stopPropagation();
    openEditor();
  }, [typeSlotUnlocked, openEditor]);

  const draftAsType = draft ? draftToType(draft) : null;

  const submit = useCallback(() => {
    if (!draftAsType) return;
    dispatch(setNodeType({nodeId: studentNode.id, type: draftAsType}));
    setOpen(false);
  }, [draftAsType, dispatch, studentNode.id]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <span
          onClick={onJudgementClick}
          className={cn(typeSlotUnlocked && "cursor-pointer")}
        >
          <MathJax key={judgement}>{`\\[ ${judgement} \\]`}</MathJax>
        </span>
      </PopoverAnchor>
      <PopoverContent className="w-auto max-w-sm space-y-2" align="start">
        <p className="text-xs font-medium text-muted-foreground">Build this judgement's type</p>
        <TypeSlotPicker value={draft} onChange={setDraft}/>
        <Button size="sm" className="w-full" disabled={!draftAsType} onClick={submit}>Set type</Button>
      </PopoverContent>
    </Popover>
  );
}
