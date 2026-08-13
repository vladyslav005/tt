import {LayoutGrid} from "lucide-react";
import {Button} from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {LAYOUT_PRESETS, requestLayoutPreset} from "@/shared/ui-state/workspaceLayoutSlice.ts";
import {useAppDispatch} from "@/shared/hooks/reduxHooks.ts";

export function LayoutPresetsDropdown() {
  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" title="Layout presets" aria-label="Layout presets">
          <LayoutGrid className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Layout presets</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        {LAYOUT_PRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.id}
            onSelect={() => dispatch(requestLayoutPreset(preset.id))}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium">{preset.label}</span>
              <span className="text-xs text-muted-foreground">{preset.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
