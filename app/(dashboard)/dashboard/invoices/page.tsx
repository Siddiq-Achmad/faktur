import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track all your invoices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>No invoices yet</CardTitle>
          <CardDescription>
            Get started by creating your first invoice
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground mb-4">
            Invoices you create will appear here
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Invoice
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
