import { Shield, AlertTriangle, Activity, Server } from "lucide-react";
import KPICard from "./KPICard";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

//todo: remove mock functionality
const mockEventData = [
  { time: "00:00", events: 234, threats: 12, alerts: 45 },
  { time: "04:00", events: 189, threats: 8, alerts: 32 },
  { time: "08:00", events: 456, threats: 23, alerts: 67 },
  { time: "12:00", events: 589, threats: 34, alerts: 89 },
  { time: "16:00", events: 445, threats: 19, alerts: 56 },
  { time: "20:00", events: 334, threats: 15, alerts: 48 },
];

const mockThreatDistribution = [
  { name: "Malware", value: 245 },
  { name: "Phishing", value: 189 },
  { name: "DDoS", value: 156 },
  { name: "Intrusion", value: 98 },
  { name: "Other", value: 67 },
];

const mockAlertSeverity = [
  { severity: "Critical", count: 23, resolved: 18 },
  { severity: "High", count: 67, resolved: 54 },
  { severity: "Medium", count: 134, resolved: 112 },
  { severity: "Low", count: 89, resolved: 78 },
];

const mockTopSources = [
  { source: "192.168.1.45", count: 234 },
  { source: "10.0.0.127", count: 189 },
  { source: "172.16.0.88", count: 156 },
  { source: "192.168.2.99", count: 145 },
  { source: "10.1.1.44", count: 123 },
];

export default function SIEMSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Events"
          value="12,847"
          trend={{ value: 15, direction: "up" }}
          subtitle="last 24h"
          icon={<Activity className="h-4 w-4" />}
        />
        <KPICard
          title="Active Threats"
          value="247"
          trend={{ value: -12, direction: "down" }}
          subtitle="vs yesterday"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <KPICard
          title="Protected Assets"
          value="1,456"
          trend={{ value: 3, direction: "up" }}
          subtitle="monitored"
          icon={<Shield className="h-4 w-4" />}
        />
        <KPICard
          title="Server Health"
          value="99.8%"
          trend={{ value: 0, direction: "neutral" }}
          subtitle="uptime"
          icon={<Server className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Security Events Timeline"
          data={mockEventData}
          dataKey="time"
          lines={["events", "threats", "alerts"]}
          area
        />
        <PieChart
          title="Threat Distribution"
          data={mockThreatDistribution}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Alert Severity Levels"
          data={mockAlertSeverity}
          dataKey="severity"
          categories={["count", "resolved"]}
          colors={["hsl(var(--chart-4))", "hsl(var(--chart-2))"]}
        />
        <BarChart
          title="Top Event Sources"
          data={mockTopSources}
          dataKey="source"
          categories={["count"]}
          layout="vertical"
          colors={["hsl(var(--chart-1))"]}
        />
      </div>
    </div>
  );
}
