import {cn} from "@/shared/lib/utils.ts";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {Play} from "lucide-react";

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
        "absolute z-20 right-4 bottom-4 shadow-lg hover:shadow-xl transition-all duration-300 gap-2",
        className
      )}
      size="lg"
    >
      <Play className="h-4 w-4" />
      Type Check
    </Button>
  );
}