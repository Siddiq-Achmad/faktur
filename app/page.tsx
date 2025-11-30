"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionSafe } from "@/lib/hooks/use-session-safe";
import { AnimatedGrid } from "@/components/landing/animated-grid";
import { HeroSection } from "@/components/landing/hero-section";

export default function Home() {
  const { data: session } = useSessionSafe();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="relative min-h-screen">
      <AnimatedGrid />
      <HeroSection />
    </div>
  );
}
