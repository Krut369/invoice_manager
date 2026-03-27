import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Document } from "./types";

interface DocumentNavigatorProps {
    docs: Document[];
    selectedDoc: Document;
    onDocSelect: (doc: Document) => void;
    onDocDelete: (docId: number) => void;
    onFileUpload: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onResetSamples: () => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
}

export function DocumentNavigator({
    docs,
    selectedDoc,
    onDocSelect,
    onDocDelete,
    onFileUpload,
    onFileChange,
    onResetSamples,
    fileInputRef,
}: DocumentNavigatorProps) {
    return (
        <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0">
            {/* Upload */}
            <div data-tour="doc-upload" className="glass-panel p-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={onFileChange}
                    accept=".pdf,.png,.jpg,.jpeg,.tiff,.doc,.docx,.xls,.xlsx,.eml"
                />
                <div
                    onClick={onFileUpload}
                    className="border-2 border-dashed border-border/50 rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer group"
                >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Drop files here</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, Office, Images, EML</p>
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        onClick={onResetSamples}
                        className="flex-1 text-xs text-center py-2 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                    >
                        Use Sample Docs
                    </button>
                </div>
            </div>

            {/* Batch Queue */}
            <div data-tour="doc-queue" className="glass-panel flex-1 overflow-hidden flex flex-col animate-slide-in-left">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <h3 className="font-medium">Document Queue</h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {docs.length} docs
                    </span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {docs.map((doc) => (
                        <div
                            key={doc.id}
                            className="group relative"
                        >
                            <button
                                onClick={() => onDocSelect(doc)}
                                className={cn(
                                    "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 pr-10",
                                    selectedDoc.id === doc.id
                                        ? "bg-primary/10 border border-primary/20"
                                        : "hover:bg-secondary"
                                )}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                                    doc.status === "processed" ? "bg-success/10" :
                                        doc.status === "review" ? "bg-warning/10" :
                                            doc.status === "error" ? "bg-destructive/10" :
                                                "bg-secondary"
                                )}>
                                    <FileText className={cn(
                                        "h-5 w-5",
                                        doc.status === "processed" ? "text-success" :
                                            doc.status === "review" ? "text-warning" :
                                                doc.status === "error" ? "text-destructive" :
                                                    "text-muted-foreground"
                                    )} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{doc.name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                                        <span className={cn(
                                            "text-[10px] px-1.5 py-0.5 rounded capitalize",
                                            doc.status === "processed" ? "bg-success/10 text-success" :
                                                doc.status === "review" ? "bg-warning/10 text-warning" :
                                                    doc.status === "error" ? "bg-destructive/10 text-destructive" :
                                                        "bg-secondary text-muted-foreground"
                                        )}>
                                            {doc.status}
                                        </span>
                                    </div>
                                </div>
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDocDelete(doc.id);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                                title="Remove document"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
