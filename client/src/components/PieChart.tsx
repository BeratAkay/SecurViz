import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart as RechartsPieChart, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface PieChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  innerRadius?: number;
}

const defaultColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function PieChart({ 
  title, 
  data, 
  colors = defaultColors,
  innerRadius = 60
}: PieChartProps) {
  return (
    <Card data-testid={`card-chart-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader>
        <CardTitle className="text-base md:text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: "hsl(var(--foreground))", strokeWidth: 1 }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--popover))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px"
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
