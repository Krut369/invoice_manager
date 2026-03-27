import { useState } from "react";
import { TickerSearch } from "./TickerSearch";
import { PriceChart } from "./PriceChart";
import { StockSnapshot } from "./StockSnapshot";
import { SentimentTimeline } from "./SentimentTimeline";
import { WhatIfSlider } from "./WhatIfSlider";
import { ResearchPanel } from "./ResearchPanel";
import { QuickActions } from "./QuickActions";

export type Persona = "investor" | "pm" | "legal" | "ops";

export type Ticker = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  premarket?: number;
  signal: "buy" | "hold" | "sell";
  signalStrength: number;
  signalRationale: string;
};

interface StockDemoProps {
  persona: Persona;
}

const sampleTickers: Record<string, Ticker> = {
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.42,
    change: 23.67,
    changePercent: 2.78,
    premarket: 882.15,
    signal: "buy",
    signalStrength: 87,
    signalRationale: "Strong AI/datacenter demand momentum with earnings beat catalyst approaching.",
  },
  XOM: {
    symbol: "XOM",
    name: "Exxon Mobil Corporation",
    price: 104.28,
    change: -1.45,
    changePercent: -1.37,
    signal: "hold",
    signalStrength: 54,
    signalRationale: "Oil price volatility and mixed macro signals suggest neutral positioning.",
  },
  F: {
    symbol: "F",
    name: "Ford Motor Company",
    price: 12.34,
    change: 0.18,
    changePercent: 1.48,
    signal: "hold",
    signalStrength: 62,
    signalRationale: "EV transition costs offset by strong truck sales; await Q4 guidance clarity.",
  },
};

// Persona-specific configurations
export const personaConfig = {
  investor: {
    label: "Investor View",
    emphasis: "risk",
    showRiskMetrics: true,
    showCompliance: false,
    showOperationalData: false,
    briefStyle: "concise",
    color: "primary",
  },
  pm: {
    label: "Product Manager View", 
    emphasis: "growth",
    showRiskMetrics: false,
    showCompliance: false,
    showOperationalData: true,
    briefStyle: "strategic",
    color: "accent",
  },
  legal: {
    label: "Legal View",
    emphasis: "compliance",
    showRiskMetrics: true,
    showCompliance: true,
    showOperationalData: false,
    briefStyle: "detailed",
    color: "warning",
  },
  ops: {
    label: "Operations View",
    emphasis: "execution",
    showRiskMetrics: false,
    showCompliance: false,
    showOperationalData: true,
    briefStyle: "actionable",
    color: "success",
  },
};

export function StockDemo({ persona }: StockDemoProps) {
  const [selectedTicker, setSelectedTicker] = useState<Ticker>(sampleTickers.NVDA);
  const [timeframe, setTimeframe] = useState<string>("1M");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [epsScenario, setEpsScenario] = useState<number>(10);

  const handleTickerSelect = (symbol: string) => {
    if (sampleTickers[symbol]) {
      setSelectedTicker(sampleTickers[symbol]);
    }
  };

  const config = personaConfig[persona];

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full animate-fade-in">
      {/* Left Column - Quick Actions & Snapshot */}
      <div className="w-full lg:w-72 xl:w-80 flex flex-col gap-4 shrink-0">
        <div data-tour="quick-actions">
          <QuickActions />
        </div>
        <div data-tour="stock-snapshot">
          <StockSnapshot ticker={selectedTicker} />
        </div>
      </div>

      {/* Center - Chart & Timeline */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Top Bar */}
        <div className="glass-panel p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div data-tour="ticker-search" className="flex-1 max-w-md">
            <TickerSearch 
              onSelect={handleTickerSelect} 
              selectedSymbol={selectedTicker.symbol}
            />
          </div>
          <div data-tour="timeframe-selector" className="flex items-center gap-2 ml-auto">
            {["1D", "1W", "1M", "1Y", "Max"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  timeframe === tf
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Price Chart */}
        <div data-tour="price-chart" className="glass-panel flex-1 p-4">
          <PriceChart 
            ticker={selectedTicker} 
            timeframe={timeframe}
            onEventSelect={setSelectedEvent}
          />
        </div>

        {/* What-If Scenario Slider */}
        <WhatIfSlider 
          currentEps={epsScenario} 
          onEpsChange={setEpsScenario} 
        />

        {/* Sentiment Timeline */}
        <div data-tour="sentiment-timeline" className="glass-panel p-4">
          <SentimentTimeline ticker={selectedTicker} persona={persona} epsScenario={epsScenario} />
        </div>
      </div>

      {/* Right Column - Research Panel */}
      <div data-tour="research-panel" className="w-full lg:w-80 xl:w-96 shrink-0">
        <ResearchPanel 
          ticker={selectedTicker} 
          selectedEvent={selectedEvent}
          persona={persona}
        />
      </div>
    </div>
  );
}
