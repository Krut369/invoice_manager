import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { MockDocumentData } from "./mockScenarios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";
import { DocumentHighlights } from "./MatchSummary";
import { cn } from "@/lib/utils";

interface DocumentPanelProps {
  title: string;
  data: MockDocumentData | null;
  isExtracting: boolean;
  highlights?: DocumentHighlights;
}

export function DocumentPanel({ title, data, isExtracting, highlights }: DocumentPanelProps) {
  return (
    <Card className="flex flex-col h-full bg-background/60 backdrop-blur-md border border-border/50 shadow-xl overflow-hidden relative">
      <CardHeader className="border-b border-border/40 bg-secondary/10 px-4 py-3 shrink-0">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      
      {isExtracting && (
        <div className="absolute inset-0 top-12 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10 transition-all duration-300">
            <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] text-primary font-medium animate-pulse">Extracting Data...</span>
            </div>
        </div>
      )}

      <ScrollArea className="flex-1">
        <CardContent className="p-4 flex flex-col gap-6">
          {/* Extracted Fields */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Extracted Fields</h4>
            <div className="rounded-md border border-border/50 overflow-hidden bg-secondary/10">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="h-8 text-xs font-medium">Field</TableHead>
                    <TableHead className="h-8 text-xs font-medium">Value</TableHead>
                    <TableHead className="h-8 text-xs font-medium text-right">Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {!data ? (
                     <TableRow>
                       <TableCell colSpan={3} className="h-24 text-center text-xs text-muted-foreground">
                         {isExtracting ? "Extracting..." : "Run extraction to view fields"}
                       </TableCell>
                     </TableRow>
                  ) : (
                    data.fields.map((field, i) => {
                      const isHighlighted = highlights?.fields.includes(field.label);
                      return (
                        <TableRow 
                          key={i} 
                          className="border-border/50 transition-colors hover:bg-secondary/20"
                        >
                          <TableCell className="py-2 text-xs font-medium text-muted-foreground">{field.label}</TableCell>
                          <TableCell className={cn("py-2 text-xs font-medium transition-colors", isHighlighted && "bg-destructive/10 text-destructive")}>{field.value}</TableCell>
                          <TableCell className={cn("py-2 text-right transition-colors", isHighlighted && "bg-destructive/10")}>
                            <ConfidenceBadge value={field.confidence} />
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Line Items</h4>
            <div className="rounded-md border border-border/50 overflow-hidden bg-secondary/10">
               <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/50">
                    <TableHead className="h-8 text-[10px] font-medium">Item</TableHead>
                    <TableHead className="h-8 text-[10px] font-medium text-right">Qty</TableHead>
                    <TableHead className="h-8 text-[10px] font-medium text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {!data ? (
                     <TableRow>
                       <TableCell colSpan={3} className="h-16 text-center text-xs text-muted-foreground">
                         No line items
                       </TableCell>
                     </TableRow>
                  ) : (
                    data.lineItems.map((item, i) => {
                      const isItemHighlighted = highlights?.lineItems.some(h => h.index === i && h.field === "item");
                      const isQtyHighlighted = highlights?.lineItems.some(h => h.index === i && h.field === "quantity");
                      const isPriceHighlighted = highlights?.lineItems.some(h => h.index === i && h.field === "unitPrice");

                      return (
                        <TableRow 
                          key={i} 
                          className="border-border/50 hover:bg-secondary/20"
                        >
                          <TableCell className={cn("py-2 text-[11px] font-medium text-muted-foreground transition-colors", isItemHighlighted && "bg-destructive/10 text-destructive")}>{item.item}</TableCell>
                          <TableCell className={cn("py-2 text-[11px] text-right transition-colors", isQtyHighlighted && "bg-destructive/10 text-destructive")}>{item.quantity}</TableCell>
                          <TableCell className={cn("py-2 text-[11px] text-right transition-colors", isPriceHighlighted && "bg-destructive/10 text-destructive")}>{item.unitPrice.toLocaleString()} {data.currency}</TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
