import LineChart from '../LineChart'

export default function LineChartExample() {
  const mockData = [
    { time: "00:00", events: 120, alerts: 45 },
    { time: "04:00", events: 98, alerts: 32 },
    { time: "08:00", events: 156, alerts: 67 },
    { time: "12:00", events: 189, alerts: 84 },
    { time: "16:00", events: 145, alerts: 56 },
    { time: "20:00", events: 134, alerts: 48 },
  ];

  return (
    <div className="p-4">
      <LineChart 
        title="Event Timeline"
        data={mockData}
        dataKey="time"
        lines={["events", "alerts"]}
        area
      />
    </div>
  )
}
