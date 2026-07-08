"use client";

import { useState } from "react";
import Link from "next/link";
import { SplashAnimation } from "@/components/splash/SplashAnimation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { categories, cities } from "@/lib/mock-data";
import { CategoryCard } from "@/components/outings/CategoryCard";
import { motion } from "framer-motion";
import { Sparkles, Users, Ticket, MessageCircle } from "lucide-react";

export default function LandingPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [splashDone, setSplashDone] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setSplashDone(true);
  };

  return (
    <>
      {showSplash && <SplashAnimation onComplete={handleSplashComplete} />}

      {splashDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-dvh"
        >
          {/* Hero */}
          <section className="relative overflow-hidden px-5 pt-16 pb-12">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
            <div className="relative mx-auto max-w-lg text-center">
              <Badge variant="live" className="mb-4">Now live in Boston</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-gradient">
                Social Battery
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed">
                Curated small-group outings for ticketed experiences.
                We handle the matching, tickets, and coordination — you show up and connect.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/signup">
                  <Button size="lg">Join Social Battery</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg">Log in</Button>
                </Link>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="px-5 py-10">
            <h2 className="text-xl font-bold text-center mb-6">How it works</h2>
            <div className="mx-auto max-w-lg space-y-4">
              {[
                { icon: Sparkles, title: "Pick an outing", desc: "Browse or get personalized suggestions" },
                { icon: Users, title: "Get matched", desc: "Placed in a curated group of 3–6 people" },
                { icon: Ticket, title: "Show up", desc: "Tickets delivered in-app, group chat opens 1hr before" },
                { icon: MessageCircle, title: "Stay connected", desc: "Become friends after outings to unlock DMs" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-panel rounded-2xl p-4 flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20">
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="px-5 py-10">
            <h2 className="text-xl font-bold mb-4">Outing categories</h2>
            <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </section>

          {/* Cities */}
          <section className="px-5 py-10">
            <h2 className="text-xl font-bold mb-4">Cities</h2>
            <div className="mx-auto max-w-lg space-y-3">
              {cities.map((city) => (
                <div key={city.id} className="glass-panel rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{city.name}, {city.state}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {city.status === "live" ? "Outings available now" : "Join the waitlist"}
                    </p>
                  </div>
                  <Badge variant={city.status === "live" ? "live" : "waitlist"}>
                    {city.status === "live" ? "Live" : "Waitlist"}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing preview */}
          <section className="px-5 py-10 pb-20">
            <h2 className="text-xl font-bold mb-4">Flexible pricing</h2>
            <div className="mx-auto max-w-lg glass-panel rounded-2xl p-5">
              <p className="text-sm text-muted">Example movie outing</p>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between"><span>One-off</span><span className="font-bold">$38</span></div>
                <div className="flex justify-between"><span>Category Pass</span><span className="font-bold text-purple-300">$33</span></div>
                <div className="flex justify-between"><span>All Access Pass</span><span className="font-bold text-emerald-300">$28</span></div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/signup">
                <Button size="lg">Get started</Button>
              </Link>
            </div>
          </section>
        </motion.div>
      )}
    </>
  );
}
