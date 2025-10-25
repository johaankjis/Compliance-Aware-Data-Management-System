"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AccessLog } from "@/lib/db"

interface UserActivityChartProps {
  logs: AccessLog[]
}

export function UserActivityChart({ logs }: UserActivityChartProps) {
  // Count actions by user
  const userCounts = logs.reduce(
    (acc, log) => {
      acc[log.user_name] = (acc[log.user_name] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(userCounts)
    .map(([user, count]) => ({
      user: user.split(" ")[1] || user, // Use last name for brevity
      count,
      fill: "hsl(var(--chart-1))",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10) // Top 10 users

  return (
    <ChartContainer
      config={{
        count: {
          label: "Actions",
        },
      }}
      className="h-[300px] w-full"
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="user" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
