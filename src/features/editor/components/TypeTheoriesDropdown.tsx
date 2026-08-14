import { ChevronDown, FlaskConical } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { TYPE_THEORIES } from "@/shared/core/domain/typeTheory.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/reduxHooks.ts";
import { setTheoryEnabled } from "@/shared/ui-state/termSlice.ts";

export interface TypeTheoriesDropdownProps {
  disabled?: boolean;
}

export function TypeTheoriesDropdown({disabled = false}: TypeTheoriesDropdownProps) {
  const dispatch = useAppDispatch();
  const enabledTheories = useAppSelector((state) => state.term.enabledTheories);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          disabled={disabled}
          title={disabled ? "Only available on the Editor page" : undefined}
        >
          <FlaskConical className="h-3.5 w-3.5" />
          Type System Extensions
          <ChevronDown className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Active extensions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked
          disabled
          onSelect={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-0.5">
            <span className="font-medium">Simply Typed Lambda Calculus</span>
            <span className="text-xs text-muted-foreground">Always enabled — the base type theory</span>
          </div>
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        {TYPE_THEORIES.map((theory) => (
          <DropdownMenuCheckboxItem
            key={theory.id}
            checked={enabledTheories[theory.id]}
            onSelect={(e) => e.preventDefault()}
            onCheckedChange={(checked) => {
              dispatch(setTheoryEnabled({ id: theory.id, enabled: checked }));
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{theory.label}</span>
              <span className="text-xs text-muted-foreground">{theory.description}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
