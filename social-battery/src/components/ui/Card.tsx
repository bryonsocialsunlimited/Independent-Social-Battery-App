import { cn } from "@/lib/utils/cn";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-2xl p-4 transition-all",
        glow && "glow-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
