import { Users, Zap, Target, TrendingUp } from "lucide-react";
import KPICard from "./KPICard";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

//todo: remove mock functionality
const mockPerformanceData = [
  { time: "Mon", efficiency: 87, tasks: 145, quality: 92 },
  { time: "Tue", efficiency: 91, tasks: 167, quality: 89 },
  { time: "Wed", efficiency: 85, tasks: 134, quality: 94 },
  { time: "Thu", efficiency: 93, tasks: 178, quality: 91 },
  { time: "Fri", efficiency: 89, tasks: 156, quality: 93 },
  { time: "Sat", efficiency: 78, tasks: 98, quality: 88 },
  { time: "Sun", efficiency: 72, tasks: 76, quality: 85 },
];

const mockTaskDistribution = [
  { name: "Completed", value: 567 },
  { name: "In Progress", value: 134 },
  { name: "Pending", value: 89 },
  { name: "Blocked", value: 23 },
];

const mockTeamActivity = [
  { team: "Engineering", tasks: 234, completed: 189 },
  { team: "Operations", tasks: 178, completed: 156 },
  { team: "Security", tasks: 145, completed: 134 },
  { team: "Support", tasks: 123, completed: 112 },
];

export default function BizzySection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Team Efficiency"
          value="87%"
          trend={{ value: 5, direction: "up" }}
          subtitle="this week"
          icon={<Zap className="h-4 w-4" />}
        />
        <KPICard
          title="Active Users"
          value="1,234"
          trend={{ value: 12, direction: "up" }}
          subtitle="online now"
          icon={<Users className="h-4 w-4" />}
        />
        <KPICard
          title="Goals Achieved"
          value="92%"
          trend={{ value: 8, direction: "up" }}
          subtitle="this month"
          icon={<Target className="h-4 w-4" />}
        />
        <KPICard
          title="Productivity"
          value="+23%"
          trend={{ value: 23, direction: "up" }}
          subtitle="vs last month"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Weekly Performance Metrics"
          data={mockPerformanceData}
          dataKey="time"
          lines={["efficiency", "quality"]}
          area
        />
        <PieChart
          title="Task Status Distribution"
          data={mockTaskDistribution}
          colors={[
            "hsl(var(--chart-2))",
            "hsl(var(--chart-1))",
            "hsl(var(--chart-3))",
            "hsl(var(--chart-4))",
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <BarChart
          title="Team Activity Overview"
          data={mockTeamActivity}
          dataKey="team"
          categories={["tasks", "completed"]}
          colors={["hsl(var(--chart-1))", "hsl(var(--chart-2))"]}
        />
      </div>
    </div>
  );
}
