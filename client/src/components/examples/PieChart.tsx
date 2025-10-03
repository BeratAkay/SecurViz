import PieChart from '../PieChart'

export default function PieChartExample() {
  const mockData = [
    { name: "Category A", value: 400 },
    { name: "Category B", value: 300 },
    { name: "Category C", value: 200 },
    { name: "Category D", value: 100 },
  ];

  return (
    <div className="p-4">
      <PieChart 
        title="Distribution"
        data={mockData}
      />
    </div>
  )
}
