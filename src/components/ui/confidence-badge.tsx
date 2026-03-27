import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  value: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ConfidenceBadge({ 
  value, 
  showLabel = true, 
  size = "md",
  className 
}: ConfidenceBadgeProps) {
  const getConfidenceLevel = (val: number) => {
    if (val >= 80) return { level: "high", label: "High", color: "text-success" };
    if (val >= 50) return { level: "medium", label: "Medium", color: "text-warning" };
    return { level: "low", label: "Low", color: "text-destructive" };
  };

  const { level, label, color } = getConfidenceLevel(value);

  const sizeClasses = {
    sm: "h-4 w-4 text-[10px]",
    md: "h-6 w-6 text-xs",
    lg: "h-8 w-8 text-sm",
  };

  const ringSize = {
    sm: 12,
    md: 20,
    lg: 28,
  };

  const strokeWidth = {
    sm: 2,
    md: 2.5,
    lg: 3,
  };

  const radius = (ringSize[size] - strokeWidth[size]) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <svg 
          width={ringSize[size]} 
          height={ringSize[size]} 
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={ringSize[size] / 2}
            cy={ringSize[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth[size]}
            className="text-muted/50"
          />
          {/* Progress circle */}
          <circle
            cx={ringSize[size] / 2}
            cy={ringSize[size] / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth[size]}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(color, "transition-all duration-500 ease-out")}
          />
        </svg>
      </div>
      {showLabel && (
        <span className={cn("font-medium tabular-nums", color, sizeClasses[size])}>
          {value}%
        </span>
      )}
    </div>
  );
}
