import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface BarChartProps {
  title: string;
  data: Array<Record<string, any>>;
  dataKey: string;
  categories: string[];
  colors?: string[];
  layout?: "vertical" | "horizontal";
  stacked?: boolean;
}

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function BarChart({ 
  title, 
  data, 
  dataKey, 
  categories, 
  colors = defaultColors,
  layout = "horizontal",
  stacked = false
}: BarChartProps) {
  return (
    <Card data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle className="text-base md:text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart 
            data={data} 
            layout={layout}
            margin={{ top: 10, right: 10, left: layout === "vertical" ? 10 : 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            {layout === "horizontal" ? (
              <>
                <XAxis dataKey={dataKey} tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
              </>
            ) : (
              <>
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey={dataKey} type="category" tick={{ fontSize: 12 }} width={100} />
              </>
            )}
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {categories.map((category, index) => (
              <Bar
                key={category}
                dataKey={category}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
                stackId={stacked ? "stack" : undefined}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
