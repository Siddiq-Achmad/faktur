"use client";

import { use, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { trpc } from "@/lib/trpc/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Pencil, Download, Loader2, ChevronDown, FileText } from "lucide-react";
import { generateInvoicePDF } from "@/lib/pdf/generate-invoice-pdf";
import { RecordPaymentDialog } from "@/components/payments/record-payment-dialog";
import { PaymentHistory } from "@/components/payments/payment-history";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/constants/status-colors";
import { TEMPLATE_OPTIONS, TemplateType } from "@/components/invoices/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: invoice, isLoading } = trpc.invoices.getById.useQuery({ id });
  const { data: businessProfile } = trpc.businessProfile.get.useQuery();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async (template: TemplateType) => {
    if (!invoice) return;

    setIsDownloading(true);
    try {
      await generateInvoicePDF({
        invoiceNumber: invoice.invoiceNumber,
        status: invoice.status,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        subtotal: invoice.subtotal,
        taxRate: invoice.taxRate,
        taxAmount: invoice.taxAmount,
        discountAmount: invoice.discountAmount || 0,
        total: invoice.total,
        notes: invoice.notes,
        terms: invoice.terms,
        client: invoice.client
          ? {
              name: invoice.client.name,
              email: invoice.client.email,
              phone: invoice.client.phone,
              company: invoice.client.company,
            }
          : null,
        items: invoice.items?.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount,
        })) || [],
        businessProfile: businessProfile
          ? {
              companyName: businessProfile.companyName,
              email: businessProfile.email,
              phone: businessProfile.phone,
              address: businessProfile.address,
              city: businessProfile.city,
              state: businessProfile.state,
              country: businessProfile.country,
              postalCode: businessProfile.postalCode,
              taxId: businessProfile.taxId,
              logo: businessProfile.logo,
            }
          : null,
      }, template);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Loading invoice...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="text-lg font-medium">Invoice not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard/invoices">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
              <Link href="/dashboard/invoices">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-mono font-semibold tracking-tight">
                  {invoice.invoiceNumber}
                </h1>
                <p className="text-sm text-muted-foreground">Invoice Details</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
          {invoice.status !== "paid" && invoice.status !== "cancelled" && (
            <RecordPaymentDialog
              invoiceId={id}
              remainingBalance={invoice.total - invoice.amountPaid}
            />
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10"
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                {isDownloading ? "Generating..." : "Download PDF"}
                {!isDownloading && <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {TEMPLATE_OPTIONS.map((template) => (
                <DropdownMenuItem
                  key={template.value}
                  onClick={() => handleDownloadPDF(template.value)}
                  className="cursor-pointer"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{template.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {template.description}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="h-10" asChild>
            <Link href={`/dashboard/invoices/${id}/edit`}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge
              className="text-xs font-medium"
              style={{
                backgroundColor: STATUS_COLORS[invoice.status],
                color: "white",
                border: "none",
              }}
            >
              {STATUS_LABELS[invoice.status]}
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Issue Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              {format(new Date(invoice.issueDate), "MMM dd, yyyy")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xs font-medium text-muted-foreground">Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">
              {format(new Date(invoice.dueDate), "MMM dd, yyyy")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-base font-medium">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Name</p>
              <p className="text-sm">{invoice.client?.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Email</p>
              <p className="text-sm">{invoice.client?.email}</p>
            </div>
            {invoice.client?.phone && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Phone</p>
                <p className="text-sm">{invoice.client.phone}</p>
              </div>
            )}
            {invoice.client?.company && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">Company</p>
                <p className="text-sm">{invoice.client.company}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-base font-medium">Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Amount</span>
              <span className="text-sm font-mono font-medium">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Amount Paid</span>
              <span className="text-sm font-mono font-medium">
                ${invoice.amountPaid.toFixed(2)}
              </span>
            </div>
            <Separator className="bg-border/50" />
            <div className="flex justify-between pt-1">
              <span className="text-base font-semibold">Balance Due</span>
              <span className="text-lg font-mono font-bold text-primary">
                ${(invoice.total - invoice.amountPaid).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-base font-medium">Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-sm">{item.description}</TableCell>
                  <TableCell className="text-right text-sm">{item.quantity}</TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    ${item.rate.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    ${item.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-3">
            <div className="flex justify-end gap-32">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-mono text-sm font-medium">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            {invoice.discountAmount && invoice.discountAmount > 0 && (
              <div className="flex justify-end gap-32">
                <span className="text-sm text-muted-foreground">Discount</span>
                <span className="font-mono text-sm font-medium text-green-600">
                  -${invoice.discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-end gap-32">
              <span className="text-sm text-muted-foreground">
                Tax ({invoice.taxRate}%)
              </span>
              <span className="font-mono text-sm font-medium">
                ${invoice.taxAmount.toFixed(2)}
              </span>
            </div>
            <Separator className="bg-border/50" />
            <div className="flex justify-end gap-32 pt-1">
              <span className="text-base font-semibold">Total</span>
              <span className="font-mono text-lg font-bold text-primary">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {(invoice.notes || invoice.terms) && (
        <div className="grid gap-6 md:grid-cols-2">
          {invoice.notes && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-base font-medium">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">
                  {invoice.notes}
                </p>
              </CardContent>
            </Card>
          )}

          {invoice.terms && (
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-base font-medium">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">
                  {invoice.terms}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Payment History */}
      <PaymentHistory invoiceId={id} />
    </div>
  );
}
