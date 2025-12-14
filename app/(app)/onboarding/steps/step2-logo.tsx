import { Button } from "@/components/ui/button";
import { LogoUpload } from "@/components/ui/logo-upload";

interface Step2Props {
  logoPreview: string | null;
  onUpload: (file: File) => Promise<void>;
  onDelete: () => void;
  uploading: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function Step2Logo({
  logoPreview,
  onUpload,
  onDelete,
  uploading,
  onBack,
  onNext,
}: Step2Props) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 min-h-[468px]">
      <div className="text-left space-y-3 pb-2">
        <h2 className="text-3xl font-bold tracking-tight">Company Logo</h2>
        <p className="text-base text-muted-foreground">
          Upload your logo to personalize invoices
        </p>
      </div>
      <div className="py-2 flex justify-center sm:justify-start">
        <LogoUpload
          preview={logoPreview}
          onUpload={onUpload}
          onDelete={onDelete}
          uploading={uploading}
          className="w-64 h-64"
          previewClassName="w-64 h-64"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 w-full sm:w-64 mx-auto sm:mx-0 pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          {logoPreview ? "Next" : "Skip"}
        </Button>
      </div>
    </div>
  );
}
