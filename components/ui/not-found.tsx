import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  /**
   * The resource type (e.g., "Invoice", "Client", "Payment")
   * Will be displayed as "{prefix} not found"
   */
  prefix: string;
  /**
   * Optional custom message instead of default "{prefix} not found"
   */
  message?: string;
  /**
   * Path to redirect when clicking the back button
   */
  backHref: string;
  /**
   * Optional custom back button label
   * Defaults to "Back to {prefix}s"
   */
  backLabel?: string;
}

export function NotFound({
  prefix,
  message,
  backHref,
  backLabel,
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <p className="text-lg font-medium text-primary">
        {message || `404 ${prefix} not found`}
      </p>
      <Button
        onClick={() => router.push(backHref)}
        variant="outline"
        size="sm"
      >
        {backLabel || `Back to ${prefix}s`}
      </Button>
    </div>
  );
}
