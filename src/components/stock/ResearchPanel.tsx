import { useState } from "react";
import { Ticker, Persona, personaConfig } from "./StockDemo";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";
import { SourceBadge, ProvenanceLink } from "@/components/ui/source-badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Mail, 
  Code, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertTriangle,
  Shield,
  Scale,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ResearchPanelProps {
  ticker: Ticker;
  selectedEvent: string | null;
  persona: Persona;
}

// Persona-specific briefs
const personaBriefs = {
  investor: [
    "NVIDIA continues to dominate the AI accelerator market with 80%+ market share in datacenter GPUs.",
    "Q3 datacenter revenue grew 279% YoY, driven by H100 demand from hyperscalers.",
    "Risk factors include China export restrictions and potential margin compression.",
    "Strong buy signal based on momentum indicators and earnings trajectory.",
    "Recommended position sizing: 3-5% of growth portfolio.",
  ],
  pm: [
    "AI/ML market adoption accelerating with NVIDIA hardware as primary infrastructure layer.",
    "Developer ecosystem shows 3x growth in CUDA adoption over past 12 months.",
    "Competitive moat strengthening through software stack (cuDNN, TensorRT, Triton).",
    "Strategic opportunity: Build integrations with NVIDIA's expanding cloud partnerships.",
    "Key metric: 89% of top-100 AI startups using NVIDIA hardware exclusively.",
  ],
  legal: [
    "Export Control Compliance: Active restrictions on H100/H800 sales to China effective Oct 2023.",
    "SEC Filing Status: 10-K and 10-Q filings current; no material disclosure gaps identified.",
    "Antitrust Considerations: EU investigation into bundling practices ongoing (Case AT.40888).",
    "Patent Portfolio: 12,450+ patents globally; 3 active litigation matters in progress.",
    "Regulatory Risk Assessment: Medium-High due to geopolitical exposure.",
  ],
  ops: [
    "Supply Chain Status: TSMC N4 capacity secured through Q2 2025; CoWoS packaging remains constraint.",
    "Inventory Levels: Channel inventory at 4.2 weeks (target: 4-6 weeks).",
    "Manufacturing Lead Time: H100 currently at 52 weeks; improving to 36 weeks by Q1.",
    "Logistics: 3 primary distribution hubs operational (Taiwan, Netherlands, Mexico).",
    "Capacity Utilization: Running at 94% with planned expansion coming online Q2.",
  ],
};

const personaDrivers = {
  investor: [
    { driver: "AI Datacenter Demand", impact: 45, direction: "positive" as const },
    { driver: "Earnings Momentum", impact: 25, direction: "positive" as const },
    { driver: "China Export Ban", impact: 15, direction: "negative" as const },
    { driver: "Valuation Premium", impact: 10, direction: "neutral" as const },
    { driver: "Macro Sentiment", impact: 5, direction: "positive" as const },
  ],
  pm: [
    { driver: "Developer Adoption", impact: 40, direction: "positive" as const },
    { driver: "Platform Stickiness", impact: 30, direction: "positive" as const },
    { driver: "Competitive Pressure", impact: 15, direction: "neutral" as const },
    { driver: "Cloud Partnership Growth", impact: 10, direction: "positive" as const },
    { driver: "Open-source Alternatives", impact: 5, direction: "negative" as const },
  ],
  legal: [
    { driver: "Regulatory Compliance", impact: 35, direction: "neutral" as const },
    { driver: "Export Restrictions", impact: 30, direction: "negative" as const },
    { driver: "IP Protection", impact: 20, direction: "positive" as const },
    { driver: "Antitrust Exposure", impact: 10, direction: "negative" as const },
    { driver: "Contract Obligations", impact: 5, direction: "neutral" as const },
  ],
  ops: [
    { driver: "Supply Chain Health", impact: 40, direction: "positive" as const },
    { driver: "Manufacturing Capacity", impact: 25, direction: "neutral" as const },
    { driver: "Logistics Efficiency", impact: 20, direction: "positive" as const },
    { driver: "Inventory Management", impact: 10, direction: "positive" as const },
    { driver: "Vendor Concentration", impact: 5, direction: "negative" as const },
  ],
};

const regenerateChipsByPersona = {
  investor: ["Valuation", "Revenue", "Risk Analysis", "ESG", "Technicals"],
  pm: ["Adoption", "Competition", "Ecosystem", "Roadmap", "Integrations"],
  legal: ["Compliance", "Patents", "Contracts", "Regulatory", "Disclosure"],
  ops: ["Supply Chain", "Capacity", "Logistics", "Vendors", "Lead Times"],
};

const sentimentBreakdown = {
  positive: 68,
  neutral: 22,
  negative: 10,
  headlines: [
    { text: "NVIDIA H100 chips see unprecedented demand from cloud providers", source: "Reuters", sentiment: "positive" },
    { text: "Analysts raise price targets after stellar Q3 results", source: "Bloomberg", sentiment: "positive" },
    { text: "China ban could impact $5B in annual revenue", source: "WSJ", sentiment: "negative" },
  ],
};

export function ResearchPanel({ ticker, selectedEvent, persona }: ResearchPanelProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brief: true,
    drivers: true,
    sentiment: false,
    evidence: false,
  });
  const [showProvenance, setShowProvenance] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const config = personaConfig[persona];
  const briefPoints = personaBriefs[persona];
  const keyDrivers = personaDrivers[persona];
  const regenerateChips = regenerateChipsByPersona[persona];

  const panelTitles = {
    investor: "Investment Research",
    pm: "Strategic Analysis",
    legal: "Compliance Review",
    ops: "Operational Report",
  };

  return (
    <div className="glass-panel h-full flex flex-col overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">{panelTitles[persona]}</h3>
            <span className={cn(
              "text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block",
              persona === "investor" ? "bg-primary/10 text-primary" :
              persona === "pm" ? "bg-accent/10 text-accent" :
              persona === "legal" ? "bg-warning/10 text-warning" :
              "bg-success/10 text-success"
            )}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ConfidenceBadge value={84} size="md" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <SourceBadge type="news" count={12} />
          <SourceBadge type="filing" count={3} />
          <SourceBadge type="social" count={45} />
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last refreshed 3m ago</span>
          <button 
            onClick={() => setShowProvenance(!showProvenance)}
            className="ml-auto text-primary hover:underline"
          >
            {showProvenance ? "Hide" : "Show"} sources
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Analyst Brief */}
        <div className="inspector-section">
          <button
            onClick={() => toggleSection("brief")}
            className="w-full flex items-center justify-between"
          >
            <span className="inspector-label mb-0">
              {persona === "investor" ? "Analyst Brief" : 
               persona === "pm" ? "Strategic Brief" :
               persona === "legal" ? "Legal Summary" :
               "Operational Summary"}
            </span>
            {expandedSections.brief ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.brief && (
            <ul className="mt-3 space-y-2">
              {briefPoints.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className={cn(
                    "shrink-0",
                    persona === "investor" ? "text-primary" :
                    persona === "pm" ? "text-accent" :
                    persona === "legal" ? "text-warning" :
                    "text-success"
                  )}>•</span>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Key Drivers */}
        <div className="inspector-section">
          <button
            onClick={() => toggleSection("drivers")}
            className="w-full flex items-center justify-between"
          >
            <span className="inspector-label mb-0">Key Drivers</span>
            {expandedSections.drivers ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.drivers && (
            <div className="mt-3 space-y-3">
              {keyDrivers.map((driver, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{driver.driver}</span>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        driver.direction === "positive"
                          ? "text-success"
                          : driver.direction === "negative"
                          ? "text-destructive"
                          : "text-muted-foreground"
                      )}
                    >
                      {driver.impact}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        driver.direction === "positive"
                          ? "bg-success"
                          : driver.direction === "negative"
                          ? "bg-destructive"
                          : "bg-muted-foreground"
                      )}
                      style={{ width: `${driver.impact}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sentiment Breakdown */}
        <div className="inspector-section">
          <button
            onClick={() => toggleSection("sentiment")}
            className="w-full flex items-center justify-between"
          >
            <span className="inspector-label mb-0">Sentiment Breakdown</span>
            {expandedSections.sentiment ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.sentiment && (
            <div className="mt-3 space-y-4">
              {/* Pie representation */}
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="hsl(var(--success))"
                      strokeWidth="3"
                      strokeDasharray={`${sentimentBreakdown.positive} ${100 - sentimentBreakdown.positive}`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth="3"
                      strokeDasharray={`${sentimentBreakdown.neutral} ${100 - sentimentBreakdown.neutral}`}
                      strokeDashoffset={`-${sentimentBreakdown.positive}`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth="3"
                      strokeDasharray={`${sentimentBreakdown.negative} ${100 - sentimentBreakdown.negative}`}
                      strokeDashoffset={`-${sentimentBreakdown.positive + sentimentBreakdown.neutral}`}
                    />
                  </svg>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-success">Positive</span>
                    <span>{sentimentBreakdown.positive}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Neutral</span>
                    <span>{sentimentBreakdown.neutral}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-destructive">Negative</span>
                    <span>{sentimentBreakdown.negative}%</span>
                  </div>
                </div>
              </div>

              {/* Headlines */}
              <div className="space-y-2">
                {sentimentBreakdown.headlines.map((headline, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-2 rounded-lg text-xs border",
                      headline.sentiment === "positive"
                        ? "bg-success/5 border-success/20"
                        : headline.sentiment === "negative"
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-secondary border-border"
                    )}
                  >
                    <p className="text-muted-foreground">{headline.text}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground/70">{headline.source}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Raw Evidence */}
        <div className="inspector-section">
          <button
            onClick={() => toggleSection("evidence")}
            className="w-full flex items-center justify-between"
          >
            <span className="inspector-label mb-0">Raw Evidence</span>
            {expandedSections.evidence ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          {expandedSections.evidence && (
            <div className="mt-3 space-y-2">
              <div className="p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground">
                <p className="italic">"Data center revenue reached a record $14.51B, up 279% from a year ago..."</p>
                <div className="flex items-center gap-2 mt-2">
                  <ProvenanceLink label="Q3 Earnings Call" />
                  <span className="text-[10px] text-muted-foreground/50">Nov 21, 2024</span>
                </div>
              </div>
              <div className="p-3 bg-secondary/50 rounded-lg text-xs text-muted-foreground">
                <p className="italic">"We see continued strong demand for H100 and growing anticipation for Blackwell..."</p>
                <div className="flex items-center gap-2 mt-2">
                  <ProvenanceLink label="CEO Comments" />
                  <span className="text-[10px] text-muted-foreground/50">Nov 21, 2024</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border/50 space-y-3">
        {/* Regenerate Chips */}
        <div>
          <span className="text-xs text-muted-foreground">Regenerate with focus on:</span>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {regenerateChips.map((chip) => (
              <button
                key={chip}
                className="px-2.5 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-xs transition-colors"
              >
                <RefreshCw className="h-3 w-3 inline mr-1" />
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Main Actions */}
        <div className="flex gap-2">
          <Button className="flex-1 gap-2" variant="default">
            <Sparkles className="h-4 w-4" />
            Generate Trade Idea
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Download className="h-3 w-3" />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Mail className="h-3 w-3" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1.5">
            <Code className="h-3 w-3" />
            JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
