import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TrustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container max-w-4xl py-12 md:py-16 mx-auto">
      <div className="mb-4">
        <Button variant="link" size="sm" asChild className="px-0!">
          <Link href="/login">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
