import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MobileShellProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
}

export function MobileShell({
  children,
  showStatusBar = true,
  className,
}: MobileShellProps) {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className={cn("app-shell relative scanline-overlay", className)}>
      {showStatusBar && (
        <div className="status-bar">
          <span>{time}</span>
          <div className="status-bar-dots" aria-hidden>
            <span className="status-bar-dot" />
            <span className="status-bar-dot" style={{ opacity: 0.4 }} />
            <span className="status-bar-dot" style={{ opacity: 0.25 }} />
          </div>
          <span className="text-[10px] tracking-widest">SB</span>
        </div>
      )}
      {children}
    </div>
  );
}
