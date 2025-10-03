import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function KPICard({ title, value, trend, subtitle, icon }: KPICardProps) {
  return (
    <Card data-testid={`card-kpi-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-mono" data-testid={`text-kpi-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {(trend || subtitle) && (
          <div className="flex items-center gap-2 mt-2">
            {trend && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  trend.direction === "up" && "text-chart-2",
                  trend.direction === "down" && "text-chart-4",
                  trend.direction === "neutral" && "text-muted-foreground"
                )}
              >
                {trend.direction === "up" && <TrendingUp className="h-4 w-4" />}
                {trend.direction === "down" && <TrendingDown className="h-4 w-4" />}
                {trend.direction === "neutral" && <Minus className="h-4 w-4" />}
                {trend.value > 0 && "+"}
                {trend.value}%
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
