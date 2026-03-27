import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, Sparkles, Lightbulb, GitCompare, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WhatIfSliderProps {
  onEpsChange: (eps: number) => void;
  currentEps: number;
}

const tradeIdeas = {
  strong_beat: [
    "Consider adding to position ahead of momentum continuation",
    "Look at short-dated call spreads for leveraged upside",
    "Evaluate related supply chain names for sympathy plays",
  ],
  beat: [
    "Hold current position; sentiment likely to stay positive",
    "Consider covered calls to capture premium",
    "Watch for dip-buying opportunities post-announcement",
  ],
  inline: [
    "Maintain neutral stance; wait for clearer signals",
    "Consider iron condor strategies for range-bound action",
    "Focus on dividend capture if applicable",
  ],
  miss: [
    "Consider reducing exposure or hedging with puts",
    "Watch support levels for potential bounce entries",
    "Evaluate if miss is one-time or trend change",
  ],
  strong_miss: [
    "Risk-off: Consider exiting or significant hedge",
    "Wait for capitulation before re-entry",
    "Look at competitor stocks for rotation plays",
  ],
};

const getEpsCategory = (value: number) => {
  if (value >= 15) return "strong_beat";
  if (value >= 5) return "beat";
  if (value >= -5) return "inline";
  if (value >= -15) return "miss";
  return "strong_miss";
};

const getSentimentFromEps = (value: number) => {
  return Math.max(0, Math.min(100, 50 + value * 2));
};

const getLabel = (value: number) => {
  if (value >= 15) return { text: "Strong Beat", color: "text-success", bg: "bg-success/10" };
  if (value >= 5) return { text: "Beat", color: "text-success", bg: "bg-success/10" };
  if (value >= -5) return { text: "In-Line", color: "text-muted-foreground", bg: "bg-secondary" };
  if (value >= -15) return { text: "Miss", color: "text-destructive", bg: "bg-destructive/10" };
  return { text: "Strong Miss", color: "text-destructive", bg: "bg-destructive/10" };
};

interface ScenarioCardProps {
  eps: number;
  onChange: (value: number) => void;
  label: string;
  compact?: boolean;
}

function ScenarioCard({ eps, onChange, label, compact }: ScenarioCardProps) {
  const epsLabel = getLabel(eps);
  const sentiment = getSentimentFromEps(eps);
  const category = getEpsCategory(eps);
  const ideas = tradeIdeas[category as keyof typeof tradeIdeas];

  return (
    <div className={cn("space-y-3", compact ? "flex-1" : "")}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium", epsLabel.bg, epsLabel.color)}>
          {epsLabel.text}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>-25%</span>
          <span className="font-medium text-foreground">
            {eps > 0 ? "+" : ""}{eps}%
          </span>
          <span>+25%</span>
        </div>
        
        <Slider
          value={[eps]}
          onValueChange={(v) => onChange(v[0])}
          min={-25}
          max={25}
          step={1}
          className="w-full"
        />

        <div className="flex gap-1">
          {[-15, 0, 15].map((preset) => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className={cn(
                "flex-1 py-1 rounded-md text-[10px] font-medium transition-all",
                eps === preset 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
              )}
            >
              {preset > 0 ? "+" : ""}{preset}%
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-1.5 mb-1">
            {eps >= 5 ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : eps <= -5 ? (
              <TrendingDown className="h-3 w-3 text-destructive" />
            ) : (
              <Minus className="h-3 w-3 text-muted-foreground" />
            )}
            <span className="text-[10px] text-muted-foreground">Sentiment</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <span className={cn(
              "text-sm font-bold",
              sentiment >= 60 ? "text-success" :
              sentiment <= 40 ? "text-destructive" :
              "text-foreground"
            )}>
              {sentiment}
            </span>
            <span className="text-[10px] text-muted-foreground">/100</span>
          </div>
        </div>

        <div className="p-2 rounded-lg bg-secondary/50">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="text-[10px] text-muted-foreground">Signal</span>
          </div>
          <div className={cn(
            "text-sm font-bold",
            eps >= 5 ? "text-success" :
            eps <= -5 ? "text-destructive" :
            "text-warning"
          )}>
            {eps >= 5 ? "BUY" : eps <= -5 ? "SELL" : "HOLD"}
          </div>
        </div>
      </div>

      {/* Trade Ideas */}
      <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Sparkles className="h-2.5 w-2.5 text-primary" />
          <span className="text-[10px] font-medium">Trade Ideas</span>
        </div>
        <ul className="space-y-1">
          {ideas.slice(0, compact ? 2 : 3).map((idea, i) => (
            <li key={i} className="flex gap-1.5 text-[10px] text-muted-foreground leading-tight">
              <span className="text-primary shrink-0">•</span>
              <span>{idea}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WhatIfSlider({ onEpsChange, currentEps }: WhatIfSliderProps) {
  const [eps, setEps] = useState(currentEps);
  const [compareMode, setCompareMode] = useState(false);
  const [epsA, setEpsA] = useState(10);
  const [epsB, setEpsB] = useState(-10);
  
  useEffect(() => {
    setEps(currentEps);
  }, [currentEps]);

  const handleChange = (value: number) => {
    setEps(value);
    onEpsChange(value);
  };

  const handleCompareToggle = (enabled: boolean) => {
    setCompareMode(enabled);
    if (!enabled) {
      onEpsChange(eps);
    }
  };

  return (
    <div className="glass-panel p-4 space-y-4" data-tour="whatif-slider">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
            {compareMode ? (
              <GitCompare className="h-4 w-4 text-primary" />
            ) : (
              <Lightbulb className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium">
              {compareMode ? "Scenario Comparison" : "What-If Scenario"}
            </h3>
            <p className="text-[10px] text-muted-foreground">
              {compareMode ? "Compare two EPS scenarios side-by-side" : "Adjust EPS surprise to see impact"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Compare</span>
          <Switch 
            checked={compareMode} 
            onCheckedChange={handleCompareToggle}
            className="scale-75"
          />
        </div>
      </div>

      {compareMode ? (
        <div className="flex gap-4">
          <div className="flex-1 p-3 rounded-xl bg-secondary/30 border border-border/50">
            <ScenarioCard 
              eps={epsA} 
              onChange={setEpsA} 
              label="Scenario A" 
              compact 
            />
          </div>
          <div className="flex items-center">
            <div className="h-full w-px bg-border/50" />
          </div>
          <div className="flex-1 p-3 rounded-xl bg-secondary/30 border border-border/50">
            <ScenarioCard 
              eps={epsB} 
              onChange={setEpsB} 
              label="Scenario B" 
              compact 
            />
          </div>
        </div>
      ) : (
        <ScenarioCard eps={eps} onChange={handleChange} label="EPS Surprise" />
      )}
    </div>
  );
}
