import React from "react";
import { CheckCircle, ArrowRight, FileText, ExternalLink } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
    isOpen: boolean;
    onClose: () => void;
    docName: string;
}

export function SuccessMessage({ isOpen, onClose, docName }: SuccessMessageProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md border-none bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-primary to-success/50" />

                <div className="flex flex-col items-center justify-center pt-6 pb-2">
                    <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6 animate-in zoom-in spin-in-12 duration-500 delay-150 fill-mode-both">
                        <CheckCircle className="w-12 h-12 text-success" />
                    </div>

                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
                            Export Successful!
                        </DialogTitle>
                        <DialogDescription className="text-base mt-2">
                            <span className="font-medium text-foreground">{docName}</span> has been successfully processed and exported to the workflow.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="grid grid-cols-1 gap-3 px-1 py-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 transition-colors hover:bg-secondary/50 group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">View Export Logs</p>
                            <p className="text-xs text-muted-foreground">Detailed processing history</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 transition-colors hover:bg-secondary/50 group cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success group-hover:scale-110 transition-transform">
                            <ExternalLink className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">Go to Dashboard</p>
                            <p className="text-xs text-muted-foreground">Monitor workflow progress</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button
                        type="button"
                        variant="default"
                        className="w-full sm:w-32 h-11 font-semibold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        onClick={onClose}
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
