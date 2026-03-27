import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TickerSearchProps {
  onSelect: (symbol: string) => void;
  selectedSymbol: string;
}

const suggestions = [
  { symbol: "NVDA", name: "NVIDIA Corporation", change: 2.78, type: "growth" },
  { symbol: "XOM", name: "Exxon Mobil", change: -1.37, type: "commodity" },
  { symbol: "F", name: "Ford Motor", change: 1.48, type: "cyclical" },
  { symbol: "AAPL", name: "Apple Inc.", change: 0.42, type: "growth" },
  { symbol: "MSFT", name: "Microsoft", change: 1.23, type: "growth" },
];

export function TickerSearch({ onSelect, selectedSymbol }: TickerSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search ticker or company..."
          className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border/50 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-panel p-2 z-50 animate-scale-in">
          <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
            {query ? "Results" : "Suggested tickers"}
          </div>
          {filteredSuggestions.map((ticker) => (
            <button
              key={ticker.symbol}
              onClick={() => handleSelect(ticker.symbol)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200",
                selectedSymbol === ticker.symbol
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-secondary"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-primary">
                  {ticker.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-sm">{ticker.symbol}</div>
                  <div className="text-xs text-muted-foreground">{ticker.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {ticker.change > 0 ? (
                  <TrendingUp className="h-3 w-3 text-success" />
                ) : ticker.change < 0 ? (
                  <TrendingDown className="h-3 w-3 text-destructive" />
                ) : (
                  <Minus className="h-3 w-3 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    ticker.change > 0
                      ? "text-success"
                      : ticker.change < 0
                      ? "text-destructive"
                      : "text-muted-foreground"
                  )}
                >
                  {ticker.change > 0 ? "+" : ""}
                  {ticker.change}%
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
