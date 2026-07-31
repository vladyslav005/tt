import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import {Rule} from "@/shared/core/application/typecheck/ProofTree.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";
import {chooseRule} from "@/shared/ui-state/termSlice.ts";
import {BUILDER_RULES, RULE_LABELS} from "@/features/proof-tree/components/proof-tree-builder/ruleLabels.ts";
import type {ReactNode} from "react";

interface RulePickerPopoverProps {
  nodeId: string;
  children: ReactNode;
}

// Every Phase-1 rule is offered unconditionally; correctness is only checked later via Check Proof.
export function RulePickerPopover({nodeId, children}: RulePickerPopoverProps) {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Pick a rule</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {BUILDER_RULES.map((rule: Rule) => (
          <DropdownMenuItem
            key={rule}
            onSelect={() => dispatch(chooseRule({nodeId, rule}))}
            className="font-mono"
          >
            {RULE_LABELS[rule]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
