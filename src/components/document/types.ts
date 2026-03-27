export type Persona = "investor" | "pm" | "legal" | "ops";

export type DocumentStatus = "processed" | "review" | "error" | "processing";
export type DocumentType = "invoice" | "receipt" | "contract";
export type RiskLevel = "low" | "medium" | "high";

export interface Document {
    id: number;
    name: string;
    pages: number;
    type: DocumentType;
    status: DocumentStatus;
    extractedData?: ApiResponseData;
    fileUrl?: string;
}

export interface BoundingBox {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ExtractedField {
    label: string;
    value: string;
    confidence: number;
    bbox: BoundingBox;
}

export interface LineItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface AutoTag {
    tag: string;
    accepted: boolean;
}

export interface Clause {
    name: string;
    summary: string;
    risk: RiskLevel;
}

export interface InvoiceDetails {
    invoice_number: string | null;
    invoice_date: string | null;
    due_date: string | null;
    payment_terms: string | null;
    purchase_order_number: string | null;
}

export interface VendorDetails {
    vendor_name: string | null;
    vendor_address: string | null;
    vendor_gstin: string | null;
}

export interface CustomerDetails {
    customer_name: string | null;
    customer_address: string | null;
    customer_gstin: string | null;
    customer_account_number: string | null;
}

export interface AmountDetails {
    tax_amount: string | null;
    total_amount: string | null;
    currency: string | null;
    bank_acc_no: string | null;
    iban: string | null;
}

export interface ApiItem {
    item_code: string | null;
    item_name: string | null;
    item_description: string | null;
    item_rate: string | null;
    item_uom: string | null;
    quantity: string | null;
    item_tax_code: string | null;
    item_tax: string | null;
    item_total_amount: string | null;
}

export interface ApiResponseData {
    invoice_details: InvoiceDetails;
    vendor_details: VendorDetails;
    customer_details: CustomerDetails;
    amount_details: AmountDetails;
    items: ApiItem[];
}

export interface ApiResponse {
    responseCode: number;
    responseMessage: string;
    data: ApiResponseData;
    usage: {
        input_tokens: number;
        output_tokens: number;
        total_tokens: number;
        cost: number;
        processing_time: number;
    };
    totalRecords?: number;
    pageRecords?: number;
    currentPageNumber?: number;
    totalPages?: number;
}
