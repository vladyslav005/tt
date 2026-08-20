import type {LucideIcon} from "lucide-react";
import type {ReactNode} from "react";
import {cn} from "@/shared/lib/utils.ts";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({icon: Icon, message, className, children}: EmptyStateProps) {
  return (
    <div className={cn(
      "h-full flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 text-center p-6",
      className,
    )}>
      <Icon className="h-8 w-8 text-muted-foreground/40" />
      <p className="text-sm text-muted-foreground max-w-sm">{message}</p>
      {children}
    </div>
  );
}
