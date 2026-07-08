import { cn } from "@/lib/utils/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted outline-none transition-colors focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
