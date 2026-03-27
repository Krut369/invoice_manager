import { Ticker } from "./StockDemo";
import { TrendingUp, TrendingDown, Minus, Sun, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConfidenceBadge } from "@/components/ui/confidence-badge";

interface StockSnapshotProps {
  ticker: Ticker;
}

export function StockSnapshot({ ticker }: StockSnapshotProps) {
  const isPositive = ticker.change >= 0;
  
  const signalColors = {
    buy: "bg-success/10 text-success border-success/20",
    hold: "bg-warning/10 text-warning border-warning/20",
    sell: "bg-destructive/10 text-destructive border-destructive/20",
  };
  
  const signalLabels = {
    buy: "Strong Buy",
    hold: "Hold",
    sell: "Sell",
  };

  return (
    <div className="glass-panel p-5 space-y-5 animate-slide-in-left">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{ticker.symbol}</h2>
            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
              NASDAQ
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{ticker.name}</p>
        </div>
        {ticker.premarket && (
          <div className="flex items-center gap-1 text-xs text-warning bg-warning/10 px-2 py-1 rounded-full">
            <Sun className="h-3 w-3" />
            <span>Pre-market</span>
          </div>
        )}
      </div>

      {/* Price */}
      <div>
        <div className="metric-large flex items-baseline gap-2">
          <span>${ticker.price.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}
          >
            {isPositive ? "+" : ""}
            {ticker.change.toFixed(2)} ({isPositive ? "+" : ""}
            {ticker.changePercent.toFixed(2)}%)
          </span>
        </div>
        {ticker.premarket && (
          <p className="text-xs text-muted-foreground mt-1">
            Pre-market: ${ticker.premarket.toFixed(2)}
          </p>
        )}
      </div>

      {/* Signal */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">AI Signal</span>
          <ConfidenceBadge value={ticker.signalStrength} size="sm" />
        </div>
        
        <button
          className={cn(
            "w-full py-3 px-4 rounded-xl border text-sm font-semibold transition-all duration-300",
            "hover:scale-[1.02] active:scale-[0.98]",
            signalColors[ticker.signal]
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            {signalLabels[ticker.signal]}
          </div>
        </button>
        
        <p className="text-xs text-muted-foreground leading-relaxed">
          {ticker.signalRationale}
        </p>
      </div>

      {/* Signal Strength Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-destructive">Bearish</span>
          <span className="text-muted-foreground">Neutral</span>
          <span className="text-success">Bullish</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              ticker.signal === "buy" 
                ? "bg-gradient-to-r from-warning to-success" 
                : ticker.signal === "sell"
                ? "bg-gradient-to-r from-destructive to-warning"
                : "bg-gradient-to-r from-warning/50 to-warning"
            )}
            style={{ width: `${ticker.signalStrength}%` }}
          />
        </div>
      </div>
    </div>
  );
}
