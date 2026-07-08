"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

const steps = [
  {
    title: "What's your social energy?",
    options: ["Mostly introverted", "Ambivert", "Mostly extroverted", "It depends on the day"],
  },
  {
    title: "What outings interest you?",
    multi: true,
    options: ["Movies", "Comedy", "Sports", "Performing Arts", "Food & drinks", "Outdoor activities"],
  },
  {
    title: "When are you usually free?",
    multi: true,
    options: ["Weekday evenings", "Weekend afternoons", "Weekend evenings", "Flexible"],
  },
  {
    title: "Budget comfort per outing?",
    options: ["Under $30", "$30–50", "$50–75", "$75+"],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, string[]>>({});

  const current = steps[step];
  const selected = selections[step] ?? [];

  const toggle = (option: string) => {
    if (current.multi) {
      setSelections((s) => ({
        ...s,
        [step]: selected.includes(option)
          ? selected.filter((o) => o !== option)
          : [...selected, option],
      }));
    } else {
      setSelections((s) => ({ ...s, [step]: [option] }));
    }
  };

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else router.push("/home");
  };

  return (
    <div className="min-h-dvh px-5 py-12 max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                i <= step ? "bg-purple-500" : "bg-white/10"
              )}
            />
          ))}
        </div>
        <p className="text-xs text-muted mt-2">Step {step + 1} of {steps.length}</p>
      </div>

      <PageHeader title={current.title} subtitle="Tap to select — we'll use this to match your groups" />

      <div className="space-y-3 mt-6">
        {current.options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={cn(
                "w-full glass-panel rounded-2xl p-4 text-left transition-all active:scale-[0.98]",
                isSelected && "ring-1 ring-purple-500/50 bg-purple-500/10"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <Button
        size="lg"
        className="w-full mt-8"
        onClick={next}
        disabled={selected.length === 0}
      >
        {step < steps.length - 1 ? "Continue" : "Finish & explore outings"}
      </Button>
    </div>
  );
}
