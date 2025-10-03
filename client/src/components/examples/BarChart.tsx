import BarChart from '../BarChart'

export default function BarChartExample() {
  const mockData = [
    { name: "Mon", value: 45, value2: 30 },
    { name: "Tue", value: 52, value2: 35 },
    { name: "Wed", value: 38, value2: 28 },
    { name: "Thu", value: 61, value2: 42 },
    { name: "Fri", value: 47, value2: 31 },
  ];

  return (
    <div className="p-4">
      <BarChart 
        title="Weekly Activity"
        data={mockData}
        dataKey="name"
        categories={["value", "value2"]}
      />
    </div>
  )
}
