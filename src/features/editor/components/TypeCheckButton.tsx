import {cn} from "@/shared/lib/utils.ts";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {Network} from "lucide-react";

export interface TypeCheckButtonProps {
  onClick?: () => void;
  className?: string;
}

export function TypeCheckButton({
                                  onClick,
                                  className
                                }: TypeCheckButtonProps) {
  const { parseAndTypeCheck } = useTermHooks()

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    parseAndTypeCheck();
  }

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "shadow-lg hover:shadow-xl transition-all duration-300 gap-2",
        className
      )}
      size="default"
    >
      <Network className="h-4 w-4" />
      Type Check
    </Button>
  );
}