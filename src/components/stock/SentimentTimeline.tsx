import { Ticker, Persona, personaConfig } from "./StockDemo";
import { cn } from "@/lib/utils";
import { Shield, TrendingUp, Scale, Settings2 } from "lucide-react";

interface SentimentTimelineProps {
  ticker: Ticker;
  persona: Persona;
  epsScenario?: number;
}

const generateSentimentData = (symbol: string, epsModifier: number = 0) => {
  const patterns: Record<string, number[]> = {
    NVDA: [0.6, 0.7, 0.8, 0.5, 0.9, 0.85, 0.75, 0.8, 0.7, 0.65, 0.8, 0.9, 0.85, 0.7],
    XOM: [0.5, 0.4, 0.3, 0.35, 0.4, 0.45, 0.3, 0.4, 0.5, 0.45, 0.4, 0.35, 0.4, 0.45],
    F: [0.5, 0.55, 0.6, 0.5, 0.55, 0.6, 0.65, 0.55, 0.5, 0.6, 0.55, 0.5, 0.6, 0.55],
  };
  
  const scores = patterns[symbol] || patterns.NVDA;
  // Apply EPS modifier to adjust sentiment (scale: -25 to +25 maps to -0.25 to +0.25)
  const epsAdjustment = epsModifier / 100;
  
  return scores.map((score, i) => {
    // Apply increasing EPS impact towards recent days
    const recencyFactor = i / scores.length;
    const adjustedScore = Math.max(0, Math.min(1, score + (epsAdjustment * recencyFactor)));
    
    return {
      day: i,
      date: new Date(Date.now() - (14 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      sentiment: adjustedScore,
      volume: Math.floor(Math.random() * 100) + 50 + (epsModifier > 0 ? 20 : epsModifier < 0 ? -10 : 0),
    };
  });
};

const relatedTickers = [
  { symbol: "AMD", similarity: 0.89, sector: "Semiconductors" },
  { symbol: "INTC", similarity: 0.82, sector: "Semiconductors" },
  { symbol: "AVGO", similarity: 0.78, sector: "Semiconductors" },
  { symbol: "TSM", similarity: 0.75, sector: "Semiconductors" },
];

// Persona-specific metrics
const personaMetrics = {
  investor: {
    icon: TrendingUp,
    metrics: [
      { label: "Risk Score", value: "Medium", color: "warning" },
      { label: "Volatility", value: "High", color: "destructive" },
      { label: "Beta", value: "1.42", color: "muted" },
    ],
  },
  pm: {
    icon: Settings2,
    metrics: [
      { label: "Market Growth", value: "+23%", color: "success" },
      { label: "TAM Expansion", value: "Strong", color: "success" },
      { label: "Adoption Rate", value: "High", color: "success" },
    ],
  },
  legal: {
    icon: Scale,
    metrics: [
      { label: "Compliance", value: "Pending", color: "warning" },
      { label: "Regulatory Risk", value: "Medium", color: "warning" },
      { label: "Disclosure", value: "Complete", color: "success" },
    ],
  },
  ops: {
    icon: Shield,
    metrics: [
      { label: "Supply Chain", value: "Stable", color: "success" },
      { label: "Execution", value: "On Track", color: "success" },
      { label: "Capacity", value: "92%", color: "warning" },
    ],
  },
};

export function SentimentTimeline({ ticker, persona, epsScenario = 0 }: SentimentTimelineProps) {
  const sentimentData = generateSentimentData(ticker.symbol, epsScenario);
  const config = personaConfig[persona];
  const metrics = personaMetrics[persona];
  const MetricIcon = metrics.icon;
  
  const getSentimentColor = (score: number) => {
    if (score >= 0.7) return "bg-success";
    if (score >= 0.4) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="space-y-4">
      {/* Persona-specific metrics banner */}
      <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
        <div className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center",
          persona === "investor" ? "bg-primary/20 text-primary" :
          persona === "pm" ? "bg-accent/20 text-accent" :
          persona === "legal" ? "bg-warning/20 text-warning" :
          "bg-success/20 text-success"
        )}>
          <MetricIcon className="h-4 w-4" />
        </div>
        <div className="flex-1 flex items-center gap-4">
          {metrics.metrics.map((metric, i) => (
            <div key={i} className="text-center">
              <p className={cn(
                "text-xs font-medium",
                metric.color === "success" ? "text-success" :
                metric.color === "warning" ? "text-warning" :
                metric.color === "destructive" ? "text-destructive" :
                "text-muted-foreground"
              )}>
                {metric.value}
              </p>
              <p className="text-[10px] text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
          {config.label}
        </span>
      </div>

      {/* Sentiment Heatmap */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Sentiment Timeline</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>Positive</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-warning" />
              <span>Neutral</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span>Negative</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 overflow-x-auto pb-2 custom-scrollbar">
          {sentimentData.map((day, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 min-w-[40px] group cursor-pointer"
            >
              <div 
                className={cn(
                  "w-8 h-10 rounded-lg transition-all duration-200 group-hover:scale-110",
                  getSentimentColor(day.sentiment)
                )}
                style={{ opacity: 0.3 + day.sentiment * 0.7 }}
              />
              <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {day.date.split(",")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tickers */}
      <div>
        <h3 className="text-sm font-medium mb-3">Similar Tickers</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
          {relatedTickers.map((related) => (
            <button
              key={related.symbol}
              className="flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-xl hover:bg-secondary transition-all duration-200 group shrink-0"
            >
              <div className="h-6 w-6 rounded-md bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {related.symbol.slice(0, 2)}
              </div>
              <div className="text-left">
                <div className="text-xs font-medium">{related.symbol}</div>
                <div className="text-[10px] text-muted-foreground">
                  {(related.similarity * 100).toFixed(0)}% similar
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
