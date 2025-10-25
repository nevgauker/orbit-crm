"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ChartsSection({
  labels,
  opportunitiesPerMonth,
  revenuePerMonth,
}: {
  labels: string[];
  opportunitiesPerMonth: number[];
  revenuePerMonth: number[];
}) {
  const oppData = {
    labels,
    datasets: [
      {
        label: "Opportunities",
        data: opportunitiesPerMonth,
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsla(var(--primary), 0.2)",
        tension: 0.3,
      },
    ],
  };

  const revData = {
    labels,
    datasets: [
      {
        label: "Revenue (Won)",
        data: revenuePerMonth,
        borderColor: "hsl(var(--accent-foreground))",
        backgroundColor: "hsla(var(--accent-foreground), 0.2)",
        tension: 0.3,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { ticks: { color: "hsl(var(--muted-foreground))" } },
      y: { ticks: { color: "hsl(var(--muted-foreground))" } },
    },
  } as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Opportunities Over Time</h3>
        <Line data={oppData} options={commonOptions} />
      </div>
      <div className="rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Revenue Growth</h3>
        <Line data={revData} options={commonOptions} />
      </div>
    </div>
  );
}
