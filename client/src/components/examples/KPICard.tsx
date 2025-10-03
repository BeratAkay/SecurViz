import KPICard from '../KPICard'
import { Shield } from 'lucide-react'

export default function KPICardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <KPICard 
        title="Total Threats" 
        value="1,247" 
        trend={{ value: 12, direction: "up" }}
        subtitle="vs last week"
        icon={<Shield className="h-4 w-4" />}
      />
      <KPICard 
        title="Active Incidents" 
        value="34" 
        trend={{ value: -8, direction: "down" }}
        subtitle="vs last week"
      />
      <KPICard 
        title="Response Time" 
        value="4.2m" 
        trend={{ value: 0, direction: "neutral" }}
        subtitle="average"
      />
    </div>
  )
}
