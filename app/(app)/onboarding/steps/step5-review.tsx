import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { OnboardingData } from "../schemas";

interface Step5Props {
  data: OnboardingData;
  logoPreview: string | null;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export function Step5Review({
  data,
  logoPreview,
  onBack,
  onConfirm,
  isSubmitting,
}: Step5Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 min-h-[468px]">
      <div className="text-left space-y-3 pb-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Review & Confirm
        </h2>
        <p className="text-base text-muted-foreground">Everything looks good?</p>
      </div>
      <div className="space-y-4 max-w-lg">
        <div className="rounded-xl border bg-muted/20 p-6 space-y-5">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Company Information
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name</span>
                <span className="text-sm font-medium">{data.companyName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">{data.email}</span>
              </div>
            </div>
          </div>

          {logoPreview && (
            <div className="pt-4 border-t">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Logo
              </h4>
              <img
                src={logoPreview}
                alt="Company logo"
                className="h-20 w-20 object-contain rounded-lg border bg-background p-2"
              />
            </div>
          )}

          {(data.phone || data.website) && (
            <div className="pt-4 border-t">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Contact Details
              </h4>
              <div className="space-y-2">
                {data.phone && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="text-sm font-medium">{data.phone}</span>
                  </div>
                )}
                {data.website && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Website
                    </span>
                    <span className="text-sm font-medium truncate ml-4">
                      {data.website}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {(data.address ||
            data.city ||
            data.state ||
            data.country ||
            data.postalCode) && (
            <div className="pt-4 border-t">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Business Address
              </h4>
              <div className="text-sm font-medium space-y-1">
                {data.address && <p>{data.address}</p>}
                <p>
                  {[data.city, data.state, data.postalCode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
                {data.country && <p>{data.country}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 max-w-lg pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          Back
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isSubmitting}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            "Launch"
          )}
        </Button>
      </div>
    </div>
  );
}
