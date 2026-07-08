"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type AppCardVariant =
  | "default"
  | "outing"
  | "group"
  | "pricing"
  | "reward"
  | "admin"
  | "interactive";

const variantStyles: Record<AppCardVariant, string> = {
  default: "glass-panel",
  outing: "glass-panel overflow-hidden",
  group: "glass-panel border-purple-500/15",
  pricing: "glass-panel",
  reward: "glass-panel border-amber-500/15 bg-gradient-to-br from-amber-500/5 to-transparent",
  admin: "glass-panel",
  interactive: "glass-panel hover:bg-[var(--card-hover)] cursor-pointer",
};

const adminSeverityStyles = {
  critical: "border-red-500/25 bg-red-500/5",
  warning: "border-amber-500/25 bg-amber-500/5",
  info: "border-cyan-500/15",
};

interface AppCardProps {
  variant?: AppCardVariant;
  severity?: "critical" | "warning" | "info";
  glow?: boolean;
  selected?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  animate?: boolean;
}

export function AppCard({
  variant = "default",
  severity,
  glow,
  selected,
  href,
  onClick,
  className,
  children,
  animate = true,
}: AppCardProps) {
  const baseClass = cn(
    "rounded-2xl p-4 transition-colors duration-200",
    variantStyles[variant],
    severity && adminSeverityStyles[severity],
    glow && "glow-accent",
    selected && "ring-1 ring-purple-500/50 bg-purple-500/10",
    className
  );

  const inner = animate ? (
    <motion.div
      className={baseClass}
      whileHover={href || onClick ? { y: -2 } : undefined}
      whileTap={href || onClick ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  ) : (
    <div className={baseClass} onClick={onClick}>
      {children}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {inner}
      </Link>
    );
  }

  return inner;
}

interface AppCardMediaProps {
  gradient: string;
  compact?: boolean;
  children?: ReactNode;
}

export function AppCardMedia({ gradient, compact, children }: AppCardMediaProps) {
  return (
    <div
      className={cn(
        "relative -mx-4 -mt-4 mb-3 bg-gradient-to-br",
        compact ? "h-20" : "h-28",
        gradient
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 to-transparent" />
      {children}
    </div>
  );
}

interface AppCardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function AppCardHeader({ title, subtitle, action }: AppCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h3 className="font-semibold text-base leading-snug truncate">{title}</h3>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

interface AppCardMetaRowProps {
  icon: ReactNode;
  children: ReactNode;
}

export function AppCardMetaRow({ icon, children }: AppCardMetaRowProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted">
      <span className="shrink-0 opacity-70">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

interface AppCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function AppCardFooter({ children, className }: AppCardFooterProps) {
  return (
    <div className={cn("mt-3 flex items-center justify-between", className)}>
      {children}
    </div>
  );
}
