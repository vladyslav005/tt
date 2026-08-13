import {ChevronDown} from "lucide-react";
import {Button} from "@/shared/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu.tsx";
import {AST_NODE_PALETTE} from "@/features/ast/components/ast-editor/astNodePalette.ts";

export interface AstNodePaletteDropdownsProps {
  onInsert: (nodeType: string) => void;
}

// One dropdown per category (Terms, Types, Polymorphism, Declarations) instead of one long
// toolbar row — each keeps its sub-groups (Math, Sums, Lists, ...) as labeled sections inside.
export function AstNodePaletteDropdowns({onInsert}: AstNodePaletteDropdownsProps) {
  return (
    <>
      {AST_NODE_PALETTE.map((category) => (
        <DropdownMenu key={category.id}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              {category.label}
              <ChevronDown className="h-3.5 w-3.5"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            {category.groups.map((group, index) => (
              <div key={group.label}>
                {index > 0 && <DropdownMenuSeparator/>}
                <DropdownMenuLabel className="text-xs text-muted-foreground">{group.label}</DropdownMenuLabel>
                <div className="flex flex-wrap gap-1 px-2 pb-2">
                  {group.items.map((item) => (
                    <Button
                      key={item.type}
                      size="sm"
                      variant="outline"
                      title={item.title}
                      className="h-7 px-2 font-mono font-bold text-xs"
                      onClick={() => onInsert(item.type)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </>
  );
}
