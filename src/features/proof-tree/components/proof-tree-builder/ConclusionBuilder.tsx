import {useCallback, useState} from "react";
import {MathJax} from "better-react-mathjax";
import type {ProofTree} from "@/shared/core/application/typecheck/ProofTree.ts";
import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {ContextBinding, StudentProofNode} from "@/shared/ui-state/studentProof.ts";
import {TexMapper} from "@/shared/presentation/tex/TexMapper.ts";
import type {GammaRegistry} from "@/shared/presentation/tex/GammaRegistry.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {revealPremise, setNodeContext, setNodeType} from "@/shared/ui-state/termSlice.ts";
import {Popover, PopoverAnchor, PopoverContent} from "@/shared/components/ui/popover.tsx";
import {Button} from "@/shared/components/ui/button.tsx";
import {Input} from "@/shared/components/ui/input.tsx";
import {cn} from "@/shared/lib/utils.ts";
import type {TypeScheme} from "@/shared/core/application/typecheck/ProofTree.ts";
import type {Type} from "@/shared/core/domain/ast";
import {BASE_TYPES, type DraftType, draftToType, typeLabel, TypeSlotPicker, typeToDraft} from "@/features/proof-tree/components/proof-tree-builder/TypeSlotPicker.tsx";
import {useTexRefExpansion} from "@/features/proof-tree/components/proof-tree-using-css/TexRefExpansionContext.tsx";

interface ConclusionBuilderProps {
  studentNode: StudentProofNode;
  answerNode: ProofTree;
  // The context this node's Γ is built on top of — its parent's real
  // gamma, or its own gamma at the root (where there's nothing to extend).
  parentGamma: Record<string, Type | TypeScheme>;
  registry: GammaRegistry;
  // A rule has been chosen (right or wrong — correctness is irrelevant
  // here), and every revealed premise already has a written type — mirrors
  // the design's "once all of a node's premises are closed, its own ?
  // becomes eligible to fill".
  typeSlotUnlocked: boolean;
}

// Numbered short form (Γ_n) by default, full recipe only when this specific
// occurrence has been toggled open — same registry-backed behavior the
// Automatic tab already has (JudgementSegments.tsx), so a builder judgement
// never has to spell out a whole context inline. `hrefKey`, when given,
// wraps the result so it's independently clickable; omit it for read-only
// spots (e.g. the local-var membership leaf) that don't need a toggle.
export function gammaRefTex(
  gamma: Record<string, Type | TypeScheme>,
  registry: GammaRegistry,
  expanded: boolean,
  hrefKey?: string,
): string {
  const ref = registry.refFor(gamma);
  if (!ref) return "\\emptyset";
  const content = expanded ? ref.fullTex : ref.shortTex;
  return hrefKey ? `\\href{${hrefKey}}{${content}}` : content;
}

// Distinct types already visible in a Γ, offered as quick-pick chips in the
// type popover — skips the plain base types (Nat/Bool/Unit) since those
// already have their own dedicated buttons; the useful case is reusing a
// compound type (an arrow) already sitting in scope without rebuilding it
// click-by-click. Deduped by rendered label, which is unambiguous for the
// TyIdentifier/TyArrow shapes this picker deals in.
function contextTypeOptions(gamma: Record<string, Type | TypeScheme>): Type[] {
  const seen = new Map<string, Type>();
  for (const value of Object.values(gamma)) {
    const type = value.kind === "TypeScheme" ? value.type : value;
    if (type.kind === "TyIdentifier" && (BASE_TYPES as readonly string[]).includes(type.name)) continue;
    seen.set(typeLabel(type), type);
  }
  return [...seen.values()];
}

type EditorKind = "type" | "context" | null;

// Renders one node's judgement as a single combined MathJax expression —
// same reasoning as JudgementSegments.tsx's own comment (adjacent MathJax
// fragments don't share a baseline) — with each interactive slot wrapped in
// \href{key}{...} so MathJax renders it as a real, clickable <a>, exactly
// the technique the automatic view already uses for its Γ_n references
// (JudgementSegments.tsx). Four kinds of slot can appear in one judgement:
// the LHS context ("gamma", toggles short/full — always available, not
// gated on any pick), an LHS context-binding addition ("context"), the RHS
// type ("type"), and — once any rule is picked, correct or not — one
// clickable span per not-yet-identified premise's sub-term inside the
// rendered term itself ("premise:N").
export function ConclusionBuilder({studentNode, answerNode, parentGamma, registry, typeSlotUnlocked}: ConclusionBuilderProps) {
  const dispatch = useAppDispatch();
  const {isExpanded, toggle} = useTexRefExpansion();
  const [openEditor, setOpenEditor] = useState<EditorKind>(null);
  const [typeDraft, setTypeDraft] = useState<DraftType | null>(null);
  const [bindingName, setBindingName] = useState("");
  const [bindingTypeDraft, setBindingTypeDraft] = useState<DraftType | null>(null);

  const hasChosenRule = studentNode.chosenRule !== undefined;
  const gammaKey = `${studentNode.id}:gamma`;

  const unrevealedPremiseIndices = new Set(
    hasChosenRule
      ? studentNode.premises.map((p, i) => (p.revealed ? -1 : i)).filter((i) => i >= 0)
      : [],
  );

  // A global var reference's term is just its bare name — nothing inside it
  // to click into like an App's func/arg — so its one premise (the "jump to
  // definition" sub-proof) is revealed by clicking the WHOLE term instead
  // of a sub-term within it.
  const isGlobalVarRef = answerNode.rule === Rule.Var && answerNode.premises.length > 0;

  const termTex = unrevealedPremiseIndices.size === 0
    ? TexMapper.termToTex(answerNode.term)
    : isGlobalVarRef
      ? `\\href{premise:0}{${TexMapper.termToTex(answerNode.term)}}`
      : TexMapper.termToTex(answerNode.term, (subterm, tex) => {
        const idx = answerNode.premises.findIndex((p) => p.term === subterm);
        return idx >= 0 && unrevealedPremiseIndices.has(idx) ? `\\href{premise:${idx}}{${tex}}` : tex;
      });

  const rhsTex = studentNode.writtenType
    ? TexMapper.typeToTex(studentNode.writtenType)
    : "?";

  const bindingTex = studentNode.writtenBindings?.length
    ? studentNode.writtenBindings.map((b) => `${b.name}:${TexMapper.typeToTex(b.type)}`).join(", ")
    : "?";

  // Same "Γ_n ∪ {...}" recipe shape the Automatic tab already uses for a
  // context-extending node (GammaRegistry's own recipe format) — never a
  // literal "∅, x:Nat": when the parent context is itself empty there's
  // nothing to union with, so the braces stand alone.
  const parentGammaRef = registry.refFor(parentGamma);
  const parentGammaTex = parentGammaRef
    ? `\\href{gamma}{${isExpanded(gammaKey) ? parentGammaRef.fullTex : parentGammaRef.shortTex}}`
    : null;
  const bindingSetTex = `\\{\\href{context}{${bindingTex}}\\}`;

  const gammaSegment = studentNode.requiresContextBuild
    ? (parentGammaTex ? `${parentGammaTex} \\cup ${bindingSetTex}` : bindingSetTex)
    : gammaRefTex(answerNode.gamma, registry, isExpanded(gammaKey), "gamma");

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

    if (key === "gamma") {
      e.preventDefault();
      e.stopPropagation();
      toggle(gammaKey);
    } else if (key === "type") {
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
  }, [typeSlotUnlocked, openTypeEditor, openContextEditor, studentNode.premises, dispatch, gammaKey, toggle]);

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
            <TypeSlotPicker value={typeDraft} onChange={setTypeDraft} contextTypes={contextTypeOptions(answerNode.gamma)}/>
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
              <TypeSlotPicker value={bindingTypeDraft} onChange={setBindingTypeDraft} contextTypes={contextTypeOptions(parentGamma)}/>
            </div>
            <Button size="sm" className="w-full" disabled={!canSubmitBinding} onClick={submitBinding}>Set binding</Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
