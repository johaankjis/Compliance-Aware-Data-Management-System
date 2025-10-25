"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AccessLog } from "@/lib/db"

interface AccessTrendsChartProps {
  logs: AccessLog[]
}

export function AccessTrendsChart({ logs }: AccessTrendsChartProps) {
  // Group logs by date
  const logsByDate = logs.reduce(
    (acc, log) => {
      const date = new Date(log.timestamp).toLocaleDateString()
      acc[date] = (acc[date] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(logsByDate)
    .map(([date, count]) => ({
      date,
      count,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7) // Last 7 days

  return (
    <ChartContainer
      config={{
        count: {
          label: "Access Events",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px] w-full"
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickFormatter={(value) => value.split("/")[1]} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
