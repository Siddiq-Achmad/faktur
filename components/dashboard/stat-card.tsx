"use client";

import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, description, trend }: StatCardProps) {
  const valueStr = String(value);
  const getValueFontSize = () => {
    const length = valueStr.length;
    if (length <= 5) return "text-xl lg:text-2xl";
    if (length <= 10) return "text-lg lg:text-xl";
    if (length <= 15) return "text-base lg:text-lg";
    return "text-sm lg:text-base";
  };

  return (
    <Card className="p-4 lg:px-6 transition-all duration-200 hover:bg-accent/50">
      <div className="space-y-1 lg:space-y-1.5">
        <p className="text-[9px] lg:text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>

        <div className="flex items-baseline gap-2">
          <h3 className={`${getValueFontSize()} font-bold tracking-tight`}>
            {value}
          </h3>
          {trend && (
            <span
              className={`text-xs font-semibold ${
                trend.isPositive ? "text-chart-1" : "text-destructive"
              }`}
            >
              {trend.isPositive ? "+\u2009" : "−\u2009"}
              {Math.abs(trend.value)}%
            </span>
          )}
        </div>

        {description && (
          <p className="text-[9px] lg:text-[10px] text-muted-foreground/80 line-clamp-1 lg:line-clamp-none">
            {description}
          </p>
        )}
      </div>
    </Card>
  );
}
