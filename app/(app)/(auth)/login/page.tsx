"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FakturLogo } from "@/components/ui/faktur-logo";
import { signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError("Failed to sign in with Google");
      console.error(err);
      setIsLoading(false);
    }
  }

  async function handleGithubSignIn() {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      setError("Failed to sign in with GitHub");
      console.error(err);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-sm shadow-none relative">
        {/* pattern */}
        <div
          className="absolute inset-0 z-0 animate-pulse dark:opacity-10"
          style={{
            backgroundImage: `
      linear-gradient(to right, rgb(176, 176, 176) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(176, 176, 176) 1px, transparent 1px)
    `,
            backgroundSize: "43px 33px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      radial-gradient(
        ellipse 80% 80% at 100% 0%,
        #000 50%,
        transparent 90%
      )
    `,
            WebkitMaskImage: `
      repeating-linear-gradient(
        to right,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      repeating-linear-gradient(
        to bottom,
        black 0px,
        black 3px,
        transparent 3px,
        transparent 8px
      ),
      radial-gradient(
        ellipse 80% 80% at 100% 0%,
        #000 50%,
        transparent 90%
      )
    `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />

        <CardHeader className="gap-1 z-10">
          <Link
            href={"/"}
            className="flex w-fit p-4 pl-0 items-center justify-center"
          >
            <FakturLogo width={24} height={24} />
          </Link>
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <CardDescription className="text-base font-medium">
            Log in to your Faktur account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-4 z-10">
          <Button
            type="button"
            variant={"outline"}
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Image src="/g.webp" alt="Google" width={16} height={16} />
            Continue with Google
          </Button>
          <Button
            type="button"
            variant={"outline"}
            className="w-full"
            onClick={handleGithubSignIn}
            disabled={isLoading}
          >
            <Image
              src="/github-mark-white.svg"
              alt="GitHub"
              width={16}
              height={16}
              className="invert-100 dark:invert-0"
            />
            Continue with GitHub
          </Button>
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive animate-in fade-in">
              {error}
            </div>
          )}
          <p className="text-xs text-center text-muted-foreground mt-4">
            By continuing, you acknowledge that you understand and agree to the{" "}
            <Link
              href="/trust/terms"
              className="font-medium text-accent-foreground hover:underline"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/trust/privacy"
              className="text-accent-foreground font-medium hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
