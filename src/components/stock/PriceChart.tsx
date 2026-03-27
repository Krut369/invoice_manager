import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { Ticker } from "./StockDemo";
import { cn } from "@/lib/utils";
import { FileText, Newspaper, TrendingUp } from "lucide-react";

interface PriceChartProps {
  ticker: Ticker;
  timeframe: string;
  onEventSelect: (eventId: string | null) => void;
}

const generateChartData = (basePrice: number, days: number, symbol: string) => {
  const data = [];
  let price = basePrice * 0.85;
  
  const events: Record<string, { day: number; type: string; title: string }[]> = {
    NVDA: [
      { day: 5, type: "earnings", title: "Q3 Earnings Beat" },
      { day: 15, type: "news", title: "AI Chip Demand Surge" },
      { day: 22, type: "filing", title: "10-K Filing" },
    ],
    XOM: [
      { day: 8, type: "news", title: "Oil Price Drop" },
      { day: 18, type: "earnings", title: "Q3 Results Mixed" },
    ],
    F: [
      { day: 10, type: "news", title: "EV Production Update" },
      { day: 20, type: "filing", title: "SEC Filing" },
    ],
  };
  
  const tickerEvents = events[symbol] || [];
  
  for (let i = 0; i < days; i++) {
    const volatility = 0.02;
    const trend = (basePrice - price) / days;
    const randomChange = (Math.random() - 0.48) * volatility * price;
    price = price + trend + randomChange;
    
    const event = tickerEvents.find(e => e.day === i);
    
    data.push({
      day: i,
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
      }),
      price: parseFloat(price.toFixed(2)),
      event: event || null,
    });
  }
  
  return data;
};

const EventMarker = ({ cx, cy, event, onClick, isSelected }: any) => {
  if (!event) return null;
  
  const icons = {
    earnings: TrendingUp,
    news: Newspaper,
    filing: FileText,
  };
  
  const Icon = icons[event.type as keyof typeof icons] || Newspaper;
  
  return (
    <g 
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className="cursor-pointer"
    >
      <circle 
        cx={cx} 
        cy={cy} 
        r={isSelected ? 14 : 10} 
        fill="hsl(var(--primary))" 
        fillOpacity={isSelected ? 0.3 : 0.2}
        className="transition-all duration-200"
      />
      <circle 
        cx={cx} 
        cy={cy} 
        r={isSelected ? 10 : 6} 
        fill="hsl(var(--primary))"
        className="transition-all duration-200"
      />
    </g>
  );
};

export function PriceChart({ ticker, timeframe, onEventSelect }: PriceChartProps) {
  const [hoveredEvent, setHoveredEvent] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const daysMap: Record<string, number> = {
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "1Y": 365,
    "Max": 365,
  };
  
  const chartData = useMemo(
    () => generateChartData(ticker.price, daysMap[timeframe] || 30, ticker.symbol),
    [ticker.price, ticker.symbol, timeframe]
  );
  
  const isPositive = ticker.change >= 0;
  const gradientId = `gradient-${ticker.symbol}`;
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    onEventSelect(event ? `${event.type}-${event.day}` : null);
  };
  
  return (
    <div className="h-[320px] relative">
      {/* Event Tooltip */}
      {(hoveredEvent || selectedEvent) && (
        <div 
          className="absolute top-4 right-4 glass-panel-light p-3 z-10 animate-scale-in max-w-xs"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              "bg-primary/10 text-primary"
            )}>
              {(hoveredEvent || selectedEvent).type}
            </span>
          </div>
          <p className="text-sm font-medium">{(hoveredEvent || selectedEvent).title}</p>
          <p className="text-xs text-muted-foreground mt-1">Click for details in Research Panel</p>
        </div>
      )}
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          onMouseLeave={() => setHoveredEvent(null)}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="0%" 
                stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
                stopOpacity={0.3} 
              />
              <stop 
                offset="100%" 
                stopColor={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"} 
                stopOpacity={0} 
              />
            </linearGradient>
          </defs>
          
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            interval="preserveStartEnd"
          />
          
          <YAxis 
            domain={['auto', 'auto']}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            tickFormatter={(value) => `$${value}`}
            width={60}
          />
          
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload?.[0]) {
                const data = payload[0].payload;
                return (
                  <div className="glass-panel p-3">
                    <p className="text-xs text-muted-foreground">{data.date}</p>
                    <p className="text-lg font-bold">${data.price.toFixed(2)}</p>
                    {data.event && (
                      <p className="text-xs text-primary mt-1">{data.event.title}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          
          <Area
            type="monotone"
            dataKey="price"
            stroke={isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))"}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            animationDuration={1000}
          />
          
          {/* Event markers */}
          {chartData.map((point, i) => 
            point.event && (
              <ReferenceDot
                key={i}
                x={point.date}
                y={point.price}
                r={0}
                shape={(props) => (
                  <EventMarker 
                    {...props} 
                    event={point.event}
                    onClick={handleEventClick}
                    isSelected={selectedEvent?.day === point.event?.day}
                  />
                )}
                onMouseEnter={() => setHoveredEvent(point.event)}
                onMouseLeave={() => setHoveredEvent(null)}
              />
            )
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
