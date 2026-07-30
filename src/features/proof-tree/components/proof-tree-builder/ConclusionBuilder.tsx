import {useCallback, useState} from "react";
import {MathJax} from "better-react-mathjax";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {ContextBinding, StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {revealPremise, setNodeContext, setNodeType} from "@/shared/ui-state/termSlice.ts";
import {Popover, PopoverAnchor, PopoverContent} from "@/shared/components/ui/popover.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {cn} from "@/shared/lib/utils.ts";
import type {TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {type DraftType, draftToType, TypeSlotPicker, typeToDraft} from "@/features/proof-tree/components/proof-tree-builder/TypeSlotPicker.tsx";

interface ConclusionBuilderProps {
  studentNode: StudentProofNode;
  answerNode: ProofTree;
  // The context this node's Γ is built on top of — its parent's real
  // gamma, or its own gamma at the root (where there's nothing to extend).
  parentGamma: Record<string, Type | TypeScheme>;
  // A rule has been chosen (right or wrong — correctness is irrelevant
  // here), and every revealed premise already has a written type — mirrors
  // the design's "once all of a node's premises are closed, its own ?
  // becomes eligible to fill".
  typeSlotUnlocked: boolean;
}

export function gammaTex(gamma: Record<string, Type | TypeScheme>): string {
  const entries = Object.entries(gamma);
  if (entries.length === 0) return "\\emptyset";
  return entries
    .map(([name, type]) => `${name}:${TexMapper.typeToTex(type)}`)
    .join(", ");
}

type EditorKind = "type" | "context" | null;

// Renders one node's judgement as a single combined MathJax expression —
// same reasoning as JudgementSegments.tsx's own comment (adjacent MathJax
// fragments don't share a baseline) — with each interactive slot wrapped in
// \href{key}{...} so MathJax renders it as a real, clickable <a>, exactly
// the technique the automatic view already uses for its Γ_n references
// (JudgementSegments.tsx). Three kinds of slot can appear in one judgement:
// the RHS type ("type"), an LHS context-binding addition ("context"), and —
// once any rule is picked, correct or not — one clickable span per
// not-yet-identified premise's sub-term inside the rendered term itself
// ("premise:N").
export function ConclusionBuilder({studentNode, answerNode, parentGamma, typeSlotUnlocked}: ConclusionBuilderProps) {
  const dispatch = useAppDispatch();
  const [openEditor, setOpenEditor] = useState<EditorKind>(null);
  const [typeDraft, setTypeDraft] = useState<DraftType | null>(null);
  const [bindingName, setBindingName] = useState("");
  const [bindingTypeDraft, setBindingTypeDraft] = useState<DraftType | null>(null);

  const hasChosenRule = studentNode.chosenRule !== undefined;

  const unrevealedPremiseIndices = new Set(
    hasChosenRule
      ? studentNode.premises.map((p, i) => (p.revealed ? -1 : i)).filter((i) => i >= 0)
      : [],
  );

  const termTex = unrevealedPremiseIndices.size > 0
    ? TexMapper.termToTex(answerNode.term, (subterm, tex) => {
      const idx = answerNode.premises.findIndex((p) => p.term === subterm);
      return idx >= 0 && unrevealedPremiseIndices.has(idx) ? `\\href{premise:${idx}}{${tex}}` : tex;
    })
    : TexMapper.termToTex(answerNode.term);

  const rhsTex = studentNode.writtenType
    ? TexMapper.typeToTex(studentNode.writtenType)
    : "?";

  const bindingTex = studentNode.writtenBindings?.length
    ? studentNode.writtenBindings.map((b) => `${b.name}:${TexMapper.typeToTex(b.type)}`).join(", ")
    : "?";

  const gammaSegment = studentNode.requiresContextBuild
    ? `${gammaTex(parentGamma)}, \\href{context}{${bindingTex}}`
    : gammaTex(answerNode.gamma);

  const judgement = `${gammaSegment} \\vdash ${termTex} : ${typeSlotUnlocked ? `\\href{type}{${rhsTex}}` : rhsTex}`;

  const openTypeEditor = useCallback(() => {
    setTypeDraft(studentNode.writtenType ? typeToDraft(studentNode.writtenType) : null);
    setOpenEditor("type");
  }, [studentNode.writtenType]);

  const openContextEditor = useCallback(() => {
    const existing = studentNode.writtenBindings?.[0];
    setBindingName(existing?.name ?? "");
    setBindingTypeDraft(existing ? typeToDraft(existing.type) : null);
    setOpenEditor("context");
  }, [studentNode.writtenBindings]);

  const onJudgementClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    // MathJax's CHTML output renders \href{}{} as data-mjx-href, not a real
    // href — see JudgementSegments.tsx for the same technique/comment.
    const key = anchor.getAttribute("data-mjx-href");
    if (key === null) return;

    if (key === "type") {
      if (!typeSlotUnlocked) return;
      e.preventDefault();
      e.stopPropagation();
      openTypeEditor();
    } else if (key === "context") {
      e.preventDefault();
      e.stopPropagation();
      openContextEditor();
    } else if (key.startsWith("premise:")) {
      e.preventDefault();
      e.stopPropagation();
      const idx = Number(key.slice("premise:".length));
      const premise = studentNode.premises[idx];
      if (premise) dispatch(revealPremise({premiseId: premise.id}));
    }
  }, [typeSlotUnlocked, openTypeEditor, openContextEditor, studentNode.premises, dispatch]);

  const typeDraftAsType = typeDraft ? draftToType(typeDraft) : null;
  const submitType = useCallback(() => {
    if (!typeDraftAsType) return;
    dispatch(setNodeType({nodeId: studentNode.id, type: typeDraftAsType}));
    setOpenEditor(null);
  }, [typeDraftAsType, dispatch, studentNode.id]);

  const bindingTypeAsType = bindingTypeDraft ? draftToType(bindingTypeDraft) : null;
  const canSubmitBinding = bindingName.trim().length > 0 && bindingTypeAsType !== null;
  const submitBinding = useCallback(() => {
    if (!canSubmitBinding || !bindingTypeAsType) return;
    const bindings: ContextBinding[] = [{name: bindingName.trim(), type: bindingTypeAsType}];
    dispatch(setNodeContext({nodeId: studentNode.id, bindings}));
    setOpenEditor(null);
  }, [canSubmitBinding, bindingTypeAsType, bindingName, dispatch, studentNode.id]);

  return (
    <Popover open={openEditor !== null} onOpenChange={(o) => !o && setOpenEditor(null)}>
      <PopoverAnchor asChild>
        <span
          onClick={onJudgementClick}
          className={cn(
            (typeSlotUnlocked || studentNode.requiresContextBuild || unrevealedPremiseIndices.size > 0) && "cursor-pointer",
          )}
        >
          <MathJax key={judgement}>{`\\[ ${judgement} \\]`}</MathJax>
        </span>
      </PopoverAnchor>
      <PopoverContent className="w-auto max-w-sm space-y-2" align="start">
        {openEditor === "type" && (
          <>
            <p className="text-xs font-medium text-muted-foreground">Build this judgement's type</p>
            <TypeSlotPicker value={typeDraft} onChange={setTypeDraft}/>
            <Button size="sm" className="w-full" disabled={!typeDraftAsType} onClick={submitType}>Set type</Button>
          </>
        )}
        {openEditor === "context" && (
          <>
            <p className="text-xs font-medium text-muted-foreground">What gets added to the context here?</p>
            <div className="flex items-center gap-1.5">
              <Input
                autoFocus
                value={bindingName}
                onChange={(e) => setBindingName(e.target.value)}
                placeholder="name"
                className="h-7 w-20 text-xs font-mono px-1"
              />
              <span className="text-muted-foreground text-xs">:</span>
              <TypeSlotPicker value={bindingTypeDraft} onChange={setBindingTypeDraft}/>
            </div>
            <Button size="sm" className="w-full" disabled={!canSubmitBinding} onClick={submitBinding}>Set binding</Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
