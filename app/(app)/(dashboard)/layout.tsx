"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionSafe } from "@/lib/hooks/use-session-safe";
import { trpc } from "@/lib/trpc/client";
import { Sidebar } from "@/components/dashboard/sidebar";
import LoadingLogo from "@/components/loading-logo";
import MobileNav from "@/components/dashboard/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSessionSafe();
  const router = useRouter();
  const { data: onboardingStatus, isLoading: isLoadingOnboarding } =
    trpc.user.getOnboardingStatus.useQuery(undefined, {
      enabled: !!session,
    });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (
      session &&
      !isLoadingOnboarding &&
      onboardingStatus &&
      !onboardingStatus.hasCompletedOnboarding
    ) {
      router.push("/onboarding");
    }
  }, [session, isLoadingOnboarding, onboardingStatus, router]);

  // Show loading while checking session or onboarding status
  if (isPending || isLoadingOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingLogo />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  // Show loading while redirecting to onboarding
  if (onboardingStatus && !onboardingStatus.hasCompletedOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingLogo />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="hidden w-56 md:block">
        <Sidebar />
      </aside>
      <div className="flex flex-1 flex-col overflow-hidden">
        <MobileNav />
        <main className="flex-1 overflow-y-auto bg-background px-6 pt-20 md:pt-2.5 pb-24">
          {children}
        </main>
      </div>
    </div>
  );
}
