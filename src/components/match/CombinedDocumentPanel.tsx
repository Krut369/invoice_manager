import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { MatchingTransaction } from "./mockScenarios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutTemplate, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocumentHighlights } from "./MatchSummary";
import { cn } from "@/lib/utils";
import { LineItemTable } from "./LineItemTable";

interface CombinedDocumentPanelProps {
  data: MatchingTransaction | null;
  isExtracting: boolean;
  highlights?: DocumentHighlights;
  onBack?: () => void;
}

export function CombinedDocumentPanel({ data, isExtracting, highlights, onBack }: CombinedDocumentPanelProps) {
  const vendorName = data?.invoice.fields.find(f => f.label === "Vendor")?.value || "-";
  const dateSub = data?.invoice.fields.find(f => f.label === "Date")?.value || "-";
  const invNumber = data?.invoice.fields.find(f => f.label === "Invoice Number")?.value || "-";
  const poNumber = data?.purchaseOrder.fields.find(f => f.label === "PO Number")?.value || "-";
  const invCurrency = data?.invoice.currency || "-";
  const poCurrency = data?.purchaseOrder.currency || "-";
  const invTotal = data?.invoice.lineItems.reduce((sum, item) => sum + item.total, 0) || 0;

  // Mock fields
  const vendorEmail = "billing@vendorcompany.com";
  const submissionStatus = "Under Review";

  // Real world approximate exchange rates (Base: INR)
  const exchangeRatesToINR: Record<string, number> = {
    AED: 22.72,
    USD: 83.50,
    EUR: 89.20,
    GBP: 104.50,
    SGD: 61.30,
    INR: 1,
  };

  let conversionRate = "1.00";
  if (poCurrency !== invCurrency) {
    if (poCurrency === "INR" && exchangeRatesToINR[invCurrency]) {
      conversionRate = `1 ${invCurrency} = ${exchangeRatesToINR[invCurrency].toFixed(2)} INR`;
    } else if (invCurrency === "INR" && exchangeRatesToINR[poCurrency]) {
      conversionRate = `1 ${poCurrency} = ${exchangeRatesToINR[poCurrency].toFixed(2)} INR`;
    } else {
      const invRate = exchangeRatesToINR[invCurrency];
      const poRate = exchangeRatesToINR[poCurrency];
      if (invRate && poRate) {
        // e.g. AED and USD. Find rate from invCurrency to poCurrency
        const directRate = invRate / poRate;
        conversionRate = `1 ${invCurrency} = ${directRate.toFixed(2)} ${poCurrency}`;
      } else {
        conversionRate = "Exchange Rate Required";
      }
    }
  }

  return (
    <Card className="flex flex-col h-full bg-background/60 backdrop-blur-md border border-border/50 overflow-hidden relative shadow-sm">
      <CardHeader className="border-b border-border/40 bg-secondary/10 px-6 py-3 shrink-0 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          {onBack && (
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="h-8 w-8 rounded-full border-border/50 bg-secondary/20 hover:bg-secondary/50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <LayoutTemplate className="w-5 h-5 text-primary" />
          Invoice Details
        </CardTitle>
        {/* <div className="flex items-center gap-3">
          <Button variant="default" size="sm" className="rounded-md px-4 shadow-sm">Accept All</Button>
          <Button variant="destructive" size="sm" className="rounded-md px-4 shadow-sm">Reject</Button>
          <Button variant="secondary" size="sm" className="rounded-md px-4 shadow-sm">Submit For Approval</Button>
          <Button variant="outline" size="sm" className="rounded-md px-4 bg-background shadow-sm">Save</Button>
          <Button variant="ghost" size="sm" className="rounded-md px-4">Cancel</Button>
        </div> */}
      </CardHeader>

      {isExtracting && (
        <div className="absolute inset-0 top-14 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300">
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-primary font-medium animate-pulse">Extracting Data...</span>
          </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <CardContent className="p-6 flex flex-col gap-8">
          {/* Invoice Information Card */}
          <div className="rounded-xl border border-border/50 bg-secondary/5 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-24">
              {/* Column 1 - Vendor Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Vendor Name:</p>
                  <p className="text-sm font-semibold text-foreground">{vendorName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Email:</p>
                  <p className="text-sm font-medium text-foreground">{vendorEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Date of Submission:</p>
                  <p className="text-sm font-medium text-foreground">{dateSub}</p>
                </div>
              </div>

              {/* Column 2 - Invoice Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Invoice Number:</p>
                  <p className="text-sm font-semibold text-foreground">{invNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">PO Number:</p>
                  <p className="text-sm font-semibold text-foreground">{poNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Total Amount:</p>
                  <p className="text-sm font-semibold text-foreground">{invTotal.toLocaleString()} {invCurrency}</p>
                </div>
              </div>

              {/* Column 3 - Currency Info */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Invoice Currency:</p>
                  <p className={cn(
                    "text-sm font-semibold",
                    invCurrency !== poCurrency ? "text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md inline-block" : "text-foreground"
                  )}>
                    {invCurrency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">PO Currency:</p>
                  <p className="text-sm font-semibold text-foreground">{poCurrency}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium mb-1">Conversion Rate:</p>
                  <p className="text-sm font-semibold text-foreground">{conversionRate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Line Items</h4>
            <LineItemTable data={data} isExtracting={isExtracting} highlights={highlights} />
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
