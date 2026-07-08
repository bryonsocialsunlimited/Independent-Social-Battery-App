import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "live" | "waitlist" | "warning" | "success";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-white/10 text-foreground": variant === "default",
          "bg-emerald-500/20 text-emerald-300": variant === "live" || variant === "success",
          "bg-amber-500/20 text-amber-300": variant === "waitlist" || variant === "warning",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
