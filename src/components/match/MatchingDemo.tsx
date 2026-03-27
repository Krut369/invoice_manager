import { useState, useEffect } from "react";
import { InvoiceList } from "./InvoiceList";
import { CombinedDocumentPanel } from "./CombinedDocumentPanel";
import { MatchSummary, MatchResult } from "./MatchSummary";
import { matchingData, MatchingTransaction } from "./mockScenarios";
import { Button } from "@/components/ui/button";
import { FileSearch, Layers, ArrowLeft, CheckCircle2 } from "lucide-react";

const calculateMatchResult = (data: MatchingTransaction): MatchResult => {
  let vendor: "match" | "warning" | "mismatch" = "match";
  let item: "match" | "warning" | "mismatch" = "match";
  let quantity: "match" | "warning" | "mismatch" = "match";
  let price: "match" | "warning" | "mismatch" = "match";
  let currency: "match" | "warning" | "mismatch" = "match";
  let overall: "approved" | "needs_review" | "blocked" = "approved";

  let vendorReason = "";
  let itemReason = "";
  let quantityReason = "";
  let priceReason = "";
  let currencyReason = "";

  const highlights = {
    fields: [] as string[],
    lineItems: [] as { index: number; field: "item" | "quantity" | "unitPrice" | "currency" | "taxAmount" | "totalAfterTax" }[]
  };

  // Vendor logic: must match exactly across all 3
  const vendorPO = data.purchaseOrder.fields.find(f => f.label === "Vendor")?.value;
  const vendorGRN = data.grn.fields.find(f => f.label === "Vendor")?.value;
  const vendorInv = data.invoice.fields.find(f => f.label === "Vendor")?.value;
  if (vendorPO !== vendorGRN || vendorPO !== vendorInv) {
    vendor = "warning";
    overall = "needs_review";
    vendorReason = `Vendor name differs across documents (PO: ${vendorPO}, Inv: ${vendorInv})`;
    highlights.fields.push("Vendor");
  }

  const maxItems = Math.max(
    data.purchaseOrder.lineItems.length,
    data.grn.lineItems.length,
    data.invoice.lineItems.length
  );

  // Currency logic
  const currPO = data.purchaseOrder.currency;
  const currInv = data.invoice.currency;
  if (currPO !== currInv) {
    currency = "mismatch";
    overall = "blocked";
    currencyReason = `Invoice currency (${currInv}) does not match PO (${currPO})`;
    // For currency mismatch, highlight the currency field and all amount fields across all line items
    for (let i = 0; i < maxItems; i++) {
      highlights.lineItems.push({ index: i, field: "currency" });
      highlights.lineItems.push({ index: i, field: "unitPrice" });
      highlights.lineItems.push({ index: i, field: "taxAmount" });
      highlights.lineItems.push({ index: i, field: "totalAfterTax" });
    }
  }

  for (let i = 0; i < maxItems; i++) {
    const itemPO = data.purchaseOrder.lineItems[i];
    const itemGRN = data.grn.lineItems[i];
    const itemInv = data.invoice.lineItems[i];

    if (itemPO) {
      if (itemGRN) {
        if (itemPO.item !== itemGRN.item) {
          item = "mismatch";
          overall = "blocked";
          itemReason = "GRN item description does not match PO";
          if (!highlights.lineItems.some(h => h.index === i && h.field === "item")) highlights.lineItems.push({ index: i, field: "item" });
        }
        if (itemPO.quantity !== itemGRN.quantity) {
          quantity = "warning";
          if (overall === "approved") overall = "needs_review";
          quantityReason = "Received quantity differs from PO quantity";
          if (!highlights.lineItems.some(h => h.index === i && h.field === "quantity")) highlights.lineItems.push({ index: i, field: "quantity" });
        }
      }

      if (itemInv) {
        if (itemPO.item !== itemInv.item) {
          item = "mismatch";
          overall = "blocked";
          itemReason = "Billed item description does not match PO";
          if (!highlights.lineItems.some(h => h.index === i && h.field === "item")) highlights.lineItems.push({ index: i, field: "item" });
        }
        if (itemPO.quantity !== itemInv.quantity) {
          quantity = "warning";
          if (overall === "approved") overall = "needs_review";
          quantityReason = "Billed quantity differs from PO/GRN quantity";
          if (!highlights.lineItems.some(h => h.index === i && h.field === "quantity")) highlights.lineItems.push({ index: i, field: "quantity" });
        }

        let invPriceInPOContext = itemInv.unitPrice;
        if (currPO !== currInv) {
          const ratesToINR: Record<string, number> = {
            AED: 22.72, USD: 83.50, EUR: 89.20, GBP: 104.50, SGD: 61.30, INR: 1
          };
          const poRate = ratesToINR[currPO] || 1;
          const invRate = ratesToINR[currInv] || 1;
          const poPriceInINR = itemPO.unitPrice * poRate;
          const convertedPoPriceInInvCurrency = poPriceInINR / invRate;

          if (Math.abs(convertedPoPriceInInvCurrency - itemInv.unitPrice) > 1) {
            price = "warning";
            if (overall === "approved") overall = "needs_review";
            priceReason = "Billed unit price deviates from PO price after conversion";
            if (!highlights.lineItems.some(h => h.index === i && h.field === "unitPrice")) highlights.lineItems.push({ index: i, field: "unitPrice" });
          }
        } else if (itemPO.unitPrice !== itemInv.unitPrice) {
          price = "warning";
          if (overall === "approved") overall = "needs_review";
          priceReason = "Billed unit price deviates from PO unit price";
          if (!highlights.lineItems.some(h => h.index === i && h.field === "unitPrice")) highlights.lineItems.push({ index: i, field: "unitPrice" });
        }
      }
    }
  }

  return {
    vendor, item, quantity, price, currency, overall, highlights,
    vendorReason, itemReason, quantityReason, priceReason, currencyReason
  };
};

export function MatchingDemo() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [listPage, setListPage] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isMatching, setIsMatching] = useState(false);

  const [extractedData, setExtractedData] = useState<MatchingTransaction | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const handleSelectInvoice = (id: string) => {
    setSelectedInvoiceId(id);
  };

  const handleBackToList = () => {
    setSelectedInvoiceId(null);
    setExtractedData(null);
    setMatchResult(null);
  }

  useEffect(() => {
    if (!selectedInvoiceId) return;

    let isSubscribed = true;

    setExtractedData(null);
    setMatchResult(null);
    setIsExtracting(true);
    setIsMatching(false);

    const scenarioData = matchingData.find(d => d.id === selectedInvoiceId);

    if (!scenarioData) {
      setIsExtracting(false);
      return;
    }

    // Simulate AI sequence: Extract -> Match
    const extractTimer = setTimeout(() => {
      if (!isSubscribed) return;
      setExtractedData(scenarioData);
      setIsExtracting(false);
      setIsMatching(true);

      setTimeout(() => {
        if (!isSubscribed) return;
        setMatchResult(calculateMatchResult(scenarioData));
        setIsMatching(false);
      }, 1200);
    }, 1500);

    return () => {
      isSubscribed = false;
      clearTimeout(extractTimer);
    };
  }, [selectedInvoiceId]);

  if (!selectedInvoiceId) {
    return (
      <div className="h-[calc(100vh-140px)] animate-fade-in custom-scrollbar">
        <InvoiceList
          onSelectInvoice={handleSelectInvoice}
          currentPage={listPage}
          onPageChange={setListPage}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 animate-fade-in relative">
      {/* Main Content Area */}
      <div className="flex-1 h-[calc(100vh-100px)] relative flex flex-col gap-4">
        <div className="flex-1 min-h-0">
          <CombinedDocumentPanel
            data={extractedData}
            isExtracting={isExtracting}
            highlights={matchResult?.highlights}
            onBack={handleBackToList}
          />
        </div>
      </div>
    </div>
  );
}
