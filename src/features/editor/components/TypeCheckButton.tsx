import {cn} from "@/shared/lib/utils.ts";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";
import {Button} from "@/shared/components/ui/button.tsx";

export interface TypeCheckButtonProps {
  onClick?: () => void;
  className?: string;
}

export function TypeCheckButton({
  onClick,
  className
}: TypeCheckButtonProps) {
  const termText = useAppSelector((state) => state.term.termText);
  const { parseAndTypeCheck } = useTermHooks()

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    parseAndTypeCheck(termText ?? "");
  }

  return (
    <Button
      onClick={handleClick}

      className={cn(className, "absolute z-20 right-10 bottom-10 px-4 py-2 rounded hover:shadow-2xl transition-colors duration-300")}
    >
      Type Check

    </Button>
  );
}