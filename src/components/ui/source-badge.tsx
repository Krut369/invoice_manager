import { cn } from "@/lib/utils";
import { ExternalLink, FileText, MessageSquare, TrendingUp, Newspaper } from "lucide-react";

type SourceType = "news" | "filing" | "social" | "research" | "transcript";

interface SourceBadgeProps {
  type: SourceType;
  count?: number;
  className?: string;
  onClick?: () => void;
}

const sourceConfig: Record<SourceType, { icon: typeof Newspaper; label: string; color: string }> = {
  news: { icon: Newspaper, label: "News", color: "text-primary bg-primary/10 border-primary/20" },
  filing: { icon: FileText, label: "Filings", color: "text-success bg-success/10 border-success/20" },
  social: { icon: MessageSquare, label: "Social", color: "text-warning bg-warning/10 border-warning/20" },
  research: { icon: TrendingUp, label: "Research", color: "text-accent bg-accent/10 border-accent/20" },
  transcript: { icon: FileText, label: "Transcript", color: "text-muted-foreground bg-muted border-border" },
};

export function SourceBadge({ type, count, className, onClick }: SourceBadgeProps) {
  const config = sourceConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200",
        "hover:scale-105 hover:shadow-sm",
        config.color,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
      {count !== undefined && (
        <span className="ml-0.5 text-[10px] opacity-70">({count})</span>
      )}
    </button>
  );
}

export function ProvenanceLink({ 
  label, 
  href, 
  className 
}: { 
  label: string; 
  href?: string; 
  className?: string 
}) {
  return (
    <a
      href={href || "#"}
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors",
        className
      )}
    >
      <span className="underline underline-offset-2">{label}</span>
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}
