import { Document, ExtractedField, LineItem, AutoTag, Clause } from "./types";

export const sampleDocuments: Document[] = [];

export const initialExtractedFields: ExtractedField[] = [
    { label: "Invoice Number", value: "INV-2024-001", confidence: 98, bbox: { x: 65, y: 12, w: 20, h: 4 } },
    { label: "Date", value: "November 15, 2024", confidence: 95, bbox: { x: 65, y: 17, w: 18, h: 4 } },
    { label: "Vendor", value: "Acme Corporation", confidence: 88, bbox: { x: 10, y: 8, w: 25, h: 5 } },
    { label: "Amount", value: "$12,450.00", confidence: 96, bbox: { x: 70, y: 75, w: 15, h: 5 } },
    { label: "Tax", value: "$1,120.50", confidence: 92, bbox: { x: 70, y: 70, w: 12, h: 4 } },
    { label: "Due Date", value: "December 15, 2024", confidence: 94, bbox: { x: 65, y: 22, w: 18, h: 4 } },
    { label: "Page Number", value: "1 / 2", confidence: 99, bbox: { x: 88, y: 2, w: 8, h: 3 } },
];

export const lineItems: LineItem[] = [
    { description: "Professional Services - Q4", quantity: 1, unitPrice: 8500, total: 8500 },
    { description: "Software License (Annual)", quantity: 3, unitPrice: 1250, total: 3750 },
    { description: "Training & Support", quantity: 2, unitPrice: 100, total: 200 },
];

export const initialAutoTags: AutoTag[] = [
    { tag: "vendor:acme-corp", accepted: true },
    { tag: "type:service-invoice", accepted: true },
    { tag: "period:q4-2024", accepted: false },
    { tag: "priority:standard", accepted: true },
];

export const clauses: Clause[] = [
    { name: "Payment Terms", summary: "Net 30 days from invoice date", risk: "low" },
    { name: "Late Fee", summary: "1.5% monthly interest on overdue amounts", risk: "medium" },
    { name: "Governing Law", summary: "State of Delaware, USA", risk: "low" },
];
