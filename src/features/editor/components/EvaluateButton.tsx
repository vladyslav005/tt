import {cn} from "@/shared/lib/utils.ts";
import {useTermHooks} from "@/shared/hooks/processTermHooks.ts";
import {Button} from "@/shared/components/ui/button.tsx";
import {Calculator, Check, ChevronDown} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu.tsx";
import {ButtonGroup} from "@/shared/components/ui/button-group.tsx";
import {useState} from "react";
import {EvaluationStrategy} from "@/shared/core/domain/evaluation/type.ts";
import {useAppSelector} from "@/shared/hooks/reduxHooks.ts";

export interface EvaluateButtonProps {
  onClick?: () => void;
  className?: string;
}

const evaluationStrategies = [
  {
    value: EvaluationStrategy.NORMAL,
    label: "Normal",
    description: "Leftmost outermost, including lambda bodies",
  },
  {
    value: EvaluationStrategy.CALL_BY_NAME,
    label: "Call by name",
    description: "Arguments are evaluated only when needed",
  },
  {
    value: EvaluationStrategy.CALL_BY_VALUE,
    label: "Call by value",
    description: "Arguments are evaluated before application",
  },
];

export function EvaluateButton({
                                  onClick,
                                  className
                                }: EvaluateButtonProps) {
  const { evaluateTerm } = useTermHooks()

  const proofTree = useAppSelector((state) => state.term.proof)
  const disabled = proofTree === undefined;

  const [strategy, setStrategy] = useState(EvaluationStrategy.CALL_BY_VALUE)

  const selectedStrategy = evaluationStrategies.find(
    (item) => item.value === strategy
  )

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    evaluateTerm(strategy);
  }

  return (
    <ButtonGroup
      className={cn(
        "shadow-lg transition-all duration-300 hover:shadow-xl",
        className
      )}
    >
      <Button
        onClick={() => handleClick()}
        className="gap-2 shadow-none"
        size="default"
        disabled={disabled}
      >
        <Calculator className="h-4 w-4" />

        Evaluate

        <span className="text-xs opacity-70">
          ({selectedStrategy?.label})
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="shadow-none"
            aria-label="Choose evaluation strategy"
            disabled={disabled}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>
            Evaluation strategy
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {evaluationStrategies.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={() => setStrategy(item.value)}
              className="flex justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </div>
              {strategy === item.value && (
                <Check className="h-4 w-4" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}