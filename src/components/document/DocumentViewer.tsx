import React from "react";
import {
    ZoomIn,
    ZoomOut,
    RotateCw,
    ChevronLeft,
    ChevronRight,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Document, ExtractedField, LineItem } from "./types";

interface DocumentViewerProps {
    selectedDoc: Document;
    currentPage: number;
    onPageChange: (page: number) => void;
    onNextPage: () => void;
    onPrevPage: () => void;
    zoom: number;
    onZoomChange: (zoom: number) => void;
    extractedFields: ExtractedField[];
    lineItems: LineItem[];
    hoveredField: number | null;
    onFieldHover: (index: number | null) => void;
}

export function DocumentViewer({
    selectedDoc,
    currentPage,
    onPageChange,
    onNextPage,
    onPrevPage,
    zoom,
    onZoomChange,
    extractedFields,
    lineItems,
    hoveredField,
    onFieldHover,
}: DocumentViewerProps) {
    return (
        <div className="flex-1 flex flex-col gap-4 min-w-0">
            {/* Viewer Controls */}
            <div data-tour="doc-viewer" className="glass-panel p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onZoomChange(Math.max(50, zoom - 10))}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <ZoomOut className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="flex items-center gap-1 bg-secondary/30 px-2 py-1 rounded-md border border-border/50">
                        <input
                            type="text"
                            value={zoom}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (!isNaN(val)) {
                                    onZoomChange(Math.min(500, Math.max(10, val)));
                                }
                            }}
                            className="w-8 bg-transparent text-center text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary rounded"
                        />
                        <span className="text-[10px] font-bold text-muted-foreground/60">%</span>
                    </div>
                    <button
                        onClick={() => onZoomChange(Math.min(200, zoom + 10))}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                    >
                        <ZoomIn className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="h-4 w-px bg-border mx-2" />
                    <button
                        onClick={() => onZoomChange(100)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                        title="Reset Zoom"
                    >
                        <RotateCw className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onPrevPage}
                        disabled={!selectedDoc || currentPage === 1}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-30"
                    >
                        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="flex items-center gap-1.5 bg-secondary/30 px-2 py-1 rounded-md border border-border/50">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground/60">Page</span>
                        <input
                            type="text"
                            value={currentPage}
                            onChange={(e) => {
                                const val = parseInt(e.target.value);
                                if (selectedDoc && !isNaN(val) && val >= 1 && val <= selectedDoc.pages) {
                                    onPageChange(val);
                                }
                            }}
                            className="w-6 bg-transparent text-center text-xs font-bold focus:outline-none focus:ring-1 focus:ring-primary rounded"
                        />
                        <span className="text-xs text-muted-foreground/60">/ {selectedDoc?.pages || 1}</span>
                    </div>
                    <button
                        onClick={onNextPage}
                        disabled={!selectedDoc || currentPage === selectedDoc.pages}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors disabled:opacity-30"
                    >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Document Preview */}
            <div className="glass-panel flex-1 overflow-auto custom-scrollbar relative bg-secondary/20 p-8">
                <div className="min-h-full flex flex-col items-center">
                    {/* Document container to handle zoom */}
                    <div
                        className="mx-auto bg-white rounded-lg shadow-2xl relative transition-all duration-300 origin-top mb-8"
                        style={{
                            transform: `scale(${zoom / 100})`,
                            width: '100%',
                            maxWidth: '800px',
                            aspectRatio: '1 / 1.414',
                        }}
                    >
                        <div className="h-full w-full p-0 text-gray-800 text-sm relative">
                            {selectedDoc?.fileUrl ? (
                                <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
                                    {selectedDoc.name.toLowerCase().endsWith('.pdf') ? (
                                        <iframe
                                            key={`${selectedDoc.id}-${currentPage}`}
                                            src={`${selectedDoc.fileUrl}#page=${currentPage}&zoom=${zoom}&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                            className="w-full h-full border-none"
                                            title="Document Preview"
                                        />
                                    ) : selectedDoc.name.toLowerCase().match(/\.(jpg|jpeg|png|tiff|gif|webp)$/) ? (
                                        <img
                                            src={selectedDoc.fileUrl}
                                            alt={selectedDoc.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/10 p-12 text-center">
                                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                                <Download className="w-10 h-10 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-bold mb-2">Native View Unavailable</h3>
                                            <p className="text-muted-foreground text-sm max-w-xs mb-6">
                                                This file format ({selectedDoc.name.split('.').pop()?.toUpperCase()}) cannot be rendered directly in the browser, but our AI is still processing it.
                                            </p>
                                            <a
                                                href={selectedDoc.fileUrl}
                                                download={selectedDoc.name}
                                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download to View
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Simulated invoice content - positioned via percentages to match extraction overlays */}
                                    <div
                                        className="absolute font-bold text-gray-900 leading-none whitespace-nowrap"
                                        style={{ top: '8%', left: '10%', height: '5%', width: '25%', display: 'flex', alignItems: 'center' }}
                                    >
                                        {selectedDoc.extractedData?.vendor_details?.vendor_name || "ACME CORPORATION"}
                                    </div>

                                    <div className="absolute font-bold text-gray-900 leading-none" style={{ top: '4%', right: '4%' }}>
                                        INVOICE
                                        <div className="text-[8px] text-gray-400 mt-0.5 uppercase tracking-tighter font-normal">Page {currentPage} of {selectedDoc?.pages || 1}</div>
                                    </div>

                                    <div className="absolute text-right leading-none whitespace-nowrap" style={{ top: '12%', left: '65%', width: '20%', height: '4%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div className="text-gray-600 font-medium font-mono">#{selectedDoc.extractedData?.invoice_details?.invoice_number || "INV-2024-001"}</div>
                                    </div>

                                    <div className="absolute text-right leading-none whitespace-nowrap" style={{ top: '17%', left: '65%', width: '18%', height: '4%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div className="text-gray-600 text-[13px]">{selectedDoc.extractedData?.invoice_details?.invoice_date || "November 15, 2024"}</div>
                                    </div>

                                    <div className="absolute text-right leading-none whitespace-nowrap" style={{ top: '22%', left: '65%', width: '18%', height: '4%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div className="text-gray-600 text-[13px]">Due: {selectedDoc.extractedData?.invoice_details?.due_date || "December 15, 2024"}</div>
                                    </div>

                                    <div className="absolute text-xs text-gray-600" style={{ top: '24%', left: '10%', width: '30%' }}>
                                        <div className="font-medium text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">Bill To:</div>
                                        <div className="text-sm font-medium text-gray-900">{selectedDoc.extractedData?.customer_details?.customer_name || "Your Company Inc."}</div>
                                        <div className="text-[10px] leading-tight text-gray-500 mt-1 max-w-[200px]">
                                            {selectedDoc.extractedData?.customer_details?.customer_address || "123 Business Ave, San Francisco, CA 94105"}
                                        </div>
                                    </div>

                                    <div className="absolute" style={{ top: '48%', left: '5%', right: '5%' }}>
                                        <table className="w-full text-xs">
                                            <thead className="border-b border-gray-300">
                                                <tr className="text-left text-gray-600">
                                                    <th className="pb-2">Description</th>
                                                    <th className="pb-2 text-center">Qty</th>
                                                    <th className="pb-2 text-right">Unit Price</th>
                                                    <th className="pb-2 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-800">
                                                {lineItems.map((item, i) => (
                                                    <tr key={i} className="border-b border-gray-100">
                                                        <td className="py-2">{item.description}</td>
                                                        <td className="py-2 text-center">{item.quantity}</td>
                                                        <td className="py-2 text-right">${item.unitPrice.toLocaleString()}</td>
                                                        <td className="py-2 text-right">${item.total.toLocaleString()}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="absolute text-right text-xs" style={{ top: '75%', left: '70%', width: '15%', height: '5%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div className="text-lg font-bold text-gray-900">
                                            {selectedDoc.extractedData?.amount_details?.currency || "$"} {selectedDoc.extractedData?.amount_details?.total_amount || "12,450.00"}
                                        </div>
                                    </div>

                                    <div className="absolute text-right text-xs" style={{ top: '70%', left: '70%', width: '12%', height: '4%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <div className="text-gray-600">
                                            {selectedDoc.extractedData?.amount_details?.currency || "$"} {selectedDoc.extractedData?.amount_details?.tax_amount || "1,120.50"}
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
