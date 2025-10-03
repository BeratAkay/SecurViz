import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import KPICard from "./KPICard";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const severityColors = [
  "hsl(142 50% 45%)",  // Low - Green
  "hsl(38 90% 50%)",   // Medium - Amber
  "hsl(25 85% 55%)",   // High - Orange
  "hsl(0 70% 50%)",    // Critical - Red
];

const verdictColors = [
  "hsl(0 70% 50%)",    // Malicious - Red
  "hsl(38 90% 50%)",   // Suspicious - Amber
  "hsl(142 50% 45%)",  // Clean - Green
  "hsl(220 10% 50%)",  // Unknown - Gray
];

// Transform API response to chart data format
function transformActiveIncidents(data: any) {
  if (!data || !data.data) return [];
  return data.data.map((item: any) => ({
    severity: item.severity || item.name || "Unknown",
    count: item.count || item.value || 0,
  }));
}

function transformClosedIncidents(data: any) {
  if (!data || !data.data) return [];
  return data.data.map((item: any) => ({
    type: item.type || item.name || "Unknown",
    count: item.count || item.value || 0,
  }));
}

function transformIncidentTypes(data: any) {
  if (!data || !data.data) return [];
  
  // Group by type and aggregate severity counts
  const grouped: Record<string, any> = {};
  
  data.data.forEach((item: any) => {
    const type = item.rawType || item.type || "Unknown";
    const severity = item.severity || "Unknown";
    const count = item.count || item.value || 0;
    
    if (!grouped[type]) {
      grouped[type] = { type };
    }
    grouped[type][severity] = count;
  });
  
  return Object.values(grouped);
}

function transformActiveIndicators(data: any) {
  if (!data || !data.data) return [];
  
  // Map score to verdict
  const scoreToVerdict: Record<string, string> = {
    '1': 'Clean',
    '2': 'Suspicious', 
    '3': 'Malicious',
    '0': 'Unknown',
  };
  
  return data.data.map((item: any) => ({
    name: scoreToVerdict[item.score] || item.verdict || item.name || "Unknown",
    value: item.count || item.value || 0,
  }));
}

export default function SOARSection() {
  const activeIncidentsQuery = useQuery({
    queryKey: ["/api/soar/active-incidents"],
  });

  const closedIncidentsQuery = useQuery({
    queryKey: ["/api/soar/closed-incidents"],
  });

  const incidentTypesQuery = useQuery({
    queryKey: ["/api/soar/incident-types"],
  });

  const activeIndicatorsQuery = useQuery({
    queryKey: ["/api/soar/active-indicators"],
  });

  const isLoading = activeIncidentsQuery.isLoading || 
                    closedIncidentsQuery.isLoading || 
                    incidentTypesQuery.isLoading || 
                    activeIndicatorsQuery.isLoading;

  const hasError = activeIncidentsQuery.error || 
                   closedIncidentsQuery.error || 
                   incidentTypesQuery.error || 
                   activeIndicatorsQuery.error;

  // Show configuration message if API is not configured
  const isNotConfigured = activeIncidentsQuery.error && 
    (activeIncidentsQuery.error as any)?.message?.includes("SOAR API configuration missing");

  const activeIncidentsData = transformActiveIncidents(activeIncidentsQuery.data);
  const closedIncidentsData = transformClosedIncidents(closedIncidentsQuery.data);
  const incidentTypesData = transformIncidentTypes(incidentTypesQuery.data);
  const activeIndicatorsData = transformActiveIndicators(activeIndicatorsQuery.data);

  // Calculate KPI values from real data
  const totalActiveIncidents = activeIncidentsData.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalClosedIncidents = closedIncidentsData.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalActiveIndicators = activeIndicatorsData.reduce((sum: number, item: any) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {isNotConfigured && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            SOAR API henüz yapılandırılmamış. Lütfen <code className="px-1 py-0.5 bg-muted rounded">SOAR_API_URL</code> ve <code className="px-1 py-0.5 bg-muted rounded">SOAR_API_AUTH</code> environment değişkenlerini ayarlayın.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Incidents"
          value={isLoading ? "..." : totalActiveIncidents}
          trend={{ value: -8, direction: "down" }}
          subtitle="last 7 days"
          icon={<AlertCircle className="h-4 w-4" />}
        />
        <KPICard
          title="Closed Incidents"
          value={isLoading ? "..." : totalClosedIncidents}
          trend={{ value: 12, direction: "up" }}
          subtitle="last 7 days"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <KPICard
          title="Avg Response Time"
          value="18m"
          trend={{ value: -15, direction: "down" }}
          subtitle="improved"
          icon={<Clock className="h-4 w-4" />}
        />
        <KPICard
          title="Active Indicators"
          value={isLoading ? "..." : totalActiveIndicators}
          trend={{ value: 5, direction: "up" }}
          subtitle="monitored"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg font-medium">
                Active Incidents by Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            </CardContent>
          </Card>
        ) : (
          <BarChart
            title="Active Incidents by Severity"
            data={activeIncidentsData}
            dataKey="severity"
            categories={["count"]}
            colors={severityColors}
          />
        )}

        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg font-medium">
                Closed Incidents by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            </CardContent>
          </Card>
        ) : (
          <BarChart
            title="Closed Incidents by Type"
            data={closedIncidentsData}
            dataKey="type"
            categories={["count"]}
            layout="vertical"
            colors={["hsl(var(--chart-2))"]}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg font-medium">
                Incident Types by Severity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            </CardContent>
          </Card>
        ) : (
          <BarChart
            title="Incident Types by Severity"
            data={incidentTypesData}
            dataKey="type"
            categories={["Low", "Medium", "High", "Critical"]}
            colors={severityColors}
            stacked
          />
        )}

        {isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-base md:text-lg font-medium">
                Active Indicators by Verdict
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Loading...
              </div>
            </CardContent>
          </Card>
        ) : (
          <PieChart
            title="Active Indicators by Verdict"
            data={activeIndicatorsData}
            colors={verdictColors}
          />
        )}
      </div>
    </div>
  );
}
