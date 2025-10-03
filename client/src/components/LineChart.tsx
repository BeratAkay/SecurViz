import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart as RechartsLineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts";

interface LineChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  lines: string[];
  colors?: string[];
  area?: boolean;
}

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function LineChart({ 
  title, 
  data, 
  dataKey, 
  lines, 
  colors = defaultColors,
  area = false
}: LineChartProps) {
  const ChartComponent = area ? AreaChart : RechartsLineChart;
  
  return (
    <Card data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle className="text-base md:text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent 
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {area ? (
              lines.map((line, index) => (
                <Area
                  key={line}
                  type="monotone"
                  dataKey={line}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              ))
            ) : (
              lines.map((line, index) => (
                <Line
                  key={line}
                  type="monotone"
                  dataKey={line}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
