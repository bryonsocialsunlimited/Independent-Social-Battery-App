import { MobileShell } from "@/components/layout/MobileShell";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageTransition } from "@/components/motion/PageTransition";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileShell>
      <main className="safe-bottom px-5 pt-2 pb-4">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </MobileShell>
  );
}
