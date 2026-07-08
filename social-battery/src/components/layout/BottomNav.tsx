"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, Calendar, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { routes } from "@/lib/routes";

const tabs = [
  { href: routes.main.home, label: "Home", icon: Home },
  { href: routes.main.explore, label: "Explore", icon: Compass },
  { href: routes.main.outings, label: "Outings", icon: Calendar },
  { href: routes.main.messages, label: "Messages", icon: MessageCircle },
  { href: routes.main.profile, label: "Profile", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[28rem] -translate-x-1/2 border-t border-white/8 bg-[#05050d]/92 backdrop-blur-xl">
      <div className="relative flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom,0px)] pt-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors duration-200",
                active ? "text-purple-400" : "text-muted hover:text-foreground"
              )}
            >
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-2 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "h-5 w-5 transition-all duration-200",
                  active && "drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                )}
              />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
