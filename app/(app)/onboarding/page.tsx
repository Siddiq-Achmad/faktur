"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/lib/trpc/client";
import { Stepper } from "@/components/ui/stepper";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { processImageForUpload } from "@/lib/image-utils";
import { useSession } from "@/lib/auth/client";
import { step1Schema, step3Schema, OnboardingData } from "./schemas";
import { Step1CompanyInfo } from "./steps/step1-company-info";
import { Step2Logo } from "./steps/step2-logo";
import { Step3Contact } from "./steps/step3-contact";
import { Step5Review } from "./steps/step5-review";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const utils = trpc.useUtils();
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    companyName: "",
    email: session?.user?.email || "",
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const { data: onboardingStatus, isLoading: isLoadingOnboarding } =
    trpc.user.getOnboardingStatus.useQuery(undefined, {
      enabled: !!session,
    });
  const upsertBusinessProfile = trpc.businessProfile.upsert.useMutation();
  const uploadLogo = trpc.businessProfile.uploadLogo.useMutation();
  const completeOnboarding = trpc.user.completeOnboarding.useMutation();

  // Redirect if already onboarded
  useEffect(() => {
    if (
      !isLoadingOnboarding &&
      onboardingStatus &&
      onboardingStatus.hasCompletedOnboarding
    ) {
      router.push("/dashboard");
    }
  }, [onboardingStatus, isLoadingOnboarding, router]);

  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      companyName: onboardingData.companyName,
      email: onboardingData.email || session?.user?.email || "",
    },
  });

  const step3Form = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      phone: onboardingData.phone || "",
      website: onboardingData.website || "",
    },
  });

  // Set default email when session loads
  useEffect(() => {
    if (session?.user?.email && !step1Form.getValues("email")) {
      step1Form.setValue("email", session.user.email);
      setOnboardingData((prev) => ({ ...prev, email: session.user.email }));
    }
  }, [session, step1Form]);

  const handleStep1Next = async () => {
    const isValid = await step1Form.trigger();
    if (isValid) {
      const values = step1Form.getValues();
      setOnboardingData((prev) => ({ ...prev, ...values }));
      setCurrentStep(2);
    }
  };

  const handleStep3Next = async () => {
    const isValid = await step3Form.trigger();
    if (isValid) {
      const values = step3Form.getValues();
      setOnboardingData((prev) => ({ ...prev, ...values }));
      setCurrentStep(4);
    }
  };

  const handleLogoUpload = async (file: File) => {
    setUploadingLogo(true);
    try {
      const base64Image = await processImageForUpload(file);
      setLogoPreview(base64Image);
      setOnboardingData((prev) => ({ ...prev, logo: base64Image }));
      toast.success("Logo uploaded successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to upload logo";
      toast.error(errorMessage);
      setLogoPreview(null);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleDeleteLogo = () => {
    setLogoPreview(null);
    setOnboardingData((prev) => ({ ...prev, logo: undefined }));
  };

  const handleConfirm = async () => {
    try {
      await upsertBusinessProfile.mutateAsync({
        companyName: onboardingData.companyName,
        email: onboardingData.email,
        phone: onboardingData.phone || "",
        website: onboardingData.website || "",
        address: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
      });

      if (onboardingData.logo) {
        await uploadLogo.mutateAsync({ logo: onboardingData.logo });
      }

      await completeOnboarding.mutateAsync();
      await utils.user.getOnboardingStatus.invalidate();

      toast.success("Welcome to Faktur!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to complete onboarding");
      console.error(error);
    }
  };

  if (isLoadingOnboarding) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const isSubmitting =
    upsertBusinessProfile.isPending ||
    uploadLogo.isPending ||
    completeOnboarding.isPending;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        {/* <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome to Faktur
          </h1>
          <p className="text-muted-foreground">
            Let's get your business set up in a few quick steps
          </p>
        </div> */}

        {/* Progress Stepper */}
        <div className="mb-12">
          <Stepper steps={4} currentStep={currentStep} />
        </div>

        {/* Content Container */}
        <div>
          <div className="space-y-6">
            {currentStep === 1 && (
              <Step1CompanyInfo form={step1Form} onNext={handleStep1Next} />
            )}

            {currentStep === 2 && (
              <Step2Logo
                logoPreview={logoPreview}
                onUpload={handleLogoUpload}
                onDelete={handleDeleteLogo}
                uploading={uploadingLogo}
                onBack={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 3 && (
              <Step3Contact
                form={step3Form}
                onBack={() => setCurrentStep(2)}
                onNext={handleStep3Next}
              />
            )}

            {currentStep === 4 && (
              <Step5Review
                data={onboardingData}
                logoPreview={logoPreview}
                onBack={() => setCurrentStep(3)}
                onConfirm={handleConfirm}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
