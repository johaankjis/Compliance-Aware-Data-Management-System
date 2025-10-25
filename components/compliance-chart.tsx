"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ComplianceChartProps {
  passed: number
  failed: number
  pending: number
}

export function ComplianceChart({ passed, failed, pending }: ComplianceChartProps) {
  const data = [
    { status: "Passed", count: passed, fill: "hsl(var(--chart-1))" },
    { status: "Failed", count: failed, fill: "hsl(var(--chart-2))" },
    { status: "Pending", count: pending, fill: "hsl(var(--chart-3))" },
  ]

  return (
    <ChartContainer
      config={{
        count: {
          label: "Datasets",
        },
      }}
      className="h-[300px] w-full"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="status" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
