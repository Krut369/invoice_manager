import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type MatchStatus = "match" | "warning" | "mismatch" | "pending";

export interface DocumentHighlights {
  fields: string[];
  lineItems: { index: number; field: "item" | "quantity" | "unitPrice" | "currency" | "taxAmount" | "totalAfterTax" }[];
}

export interface MatchResult {
  vendor: MatchStatus;
  item: MatchStatus;
  quantity: MatchStatus;
  price: MatchStatus;
  currency: MatchStatus;
  vendorReason?: string;
  itemReason?: string;
  quantityReason?: string;
  priceReason?: string;
  currencyReason?: string;
  overall: "approved" | "needs_review" | "blocked" | "pending";
  highlights?: DocumentHighlights;
}

interface MatchSummaryProps {
  result: MatchResult | null;
  isMatching: boolean;
}

const StatusIcon = ({ status }: { status: MatchStatus }) => {
  if (status === "match") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  if (status === "warning") return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  if (status === "mismatch") return <XCircle className="w-4 h-4 text-rose-500" />;
  return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground animate-spin" />;
};

const StatusText = ({ status, matchLabel, warningLabel, mismatchLabel }: { status: MatchStatus, matchLabel: string, warningLabel: string, mismatchLabel: string }) => {
  if (status === "match") return <span className="text-emerald-500 font-medium text-xs">{matchLabel}</span>;
  if (status === "warning") return <span className="text-amber-500 font-medium text-xs">{warningLabel}</span>;
  if (status === "mismatch") return <span className="text-rose-500 font-medium text-xs">{mismatchLabel}</span>;
  return <span className="text-muted-foreground font-medium text-xs">Pending...</span>;
};

export function MatchSummary({ result, isMatching }: MatchSummaryProps) {
  return (
    <Card className="bg-background/80 backdrop-blur-xl border border-border/50 relative overflow-hidden">
      {/* Background glow effects based on status */}
      {result?.overall === "approved" && (
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
      )}
      {result?.overall === "needs_review" && (
        <div className="absolute inset-0 bg-amber-500/5 pointer-events-none" />
      )}
      {result?.overall === "blocked" && (
        <div className="absolute inset-0 bg-rose-500/5 pointer-events-none" />
      )}

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Match Results
          </CardTitle>
          {result && !isMatching && (
             <Badge className={cn(
               "px-3 py-1 font-semibold uppercase tracking-wider text-[10px]",
               result.overall === "approved" && "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20",
               result.overall === "needs_review" && "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20",
               result.overall === "blocked" && "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border-rose-500/20"
             )} variant="outline">
               {result.overall.replace("_", " ")}
             </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3">
            <MatchRow 
              label="Vendor" 
              status={isMatching ? "pending" : (result?.vendor || "pending")} 
              matchLabel="Match" 
              warningLabel="Minor difference" 
              mismatchLabel="Mismatch"
              reason={result?.vendorReason}
            />
            <MatchRow 
              label="Item Name" 
              status={isMatching ? "pending" : (result?.item || "pending")} 
              matchLabel="Match" 
              warningLabel="Minor difference" 
              mismatchLabel="Mismatch"
              reason={result?.itemReason}
            />
            <MatchRow 
              label="Quantity" 
              status={isMatching ? "pending" : (result?.quantity || "pending")} 
              matchLabel="Match" 
              warningLabel="Quantity mismatch" 
              mismatchLabel="Mismatch"
              reason={result?.quantityReason}
            />
            <MatchRow 
              label="Unit Price" 
              status={isMatching ? "pending" : (result?.price || "pending")} 
              matchLabel="Match" 
              warningLabel="Price mismatch" 
              mismatchLabel="Mismatch"
              reason={result?.priceReason}
            />
            <MatchRow 
              label="Currency" 
              status={isMatching ? "pending" : (result?.currency || "pending")} 
              matchLabel="Match" 
              warningLabel="Currency mismatch" 
              mismatchLabel="Mismatch"
              reason={result?.currencyReason}
            />
          </div>
          
          {result?.overall === "blocked" && result.currency === "mismatch" && (
             <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-md flex items-start gap-3">
               <AlertTriangle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-medium text-rose-500">Currency Mismatch Detected</span>
                 <span className="text-xs text-rose-500/80 mt-1">Invoice currency does not match Purchase Order currency. Conversion required before validation.</span>
               </div>
             </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function MatchRow({ label, status, matchLabel, warningLabel, mismatchLabel, reason }: { 
  label: string; 
  status: MatchStatus;
  matchLabel: string;
  warningLabel: string;
  mismatchLabel: string;
  reason?: string;
}) {
  return (
    <div className="flex flex-col p-3 rounded-md bg-secondary/20 border border-border/30 transition-all hover:bg-secondary/30">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <div className="flex items-center gap-2">
          <StatusText status={status} matchLabel={matchLabel} warningLabel={warningLabel} mismatchLabel={mismatchLabel} />
          <StatusIcon status={status} />
        </div>
      </div>
      {(status === "warning" || status === "mismatch") && reason && (
        <span className="text-xs mt-1 text-muted-foreground">{reason}</span>
      )}
    </div>
  );
}
