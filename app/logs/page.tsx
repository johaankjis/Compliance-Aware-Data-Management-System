import { AccessLogsTable } from "@/components/access-logs-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAccessLogs } from "@/lib/db"

export default async function LogsPage() {
  const logs = await getAccessLogs()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Compliance Data System</h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/upload">
              <Button variant="ghost">Upload Data</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/reports">
              <Button variant="ghost">Reports</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Access Logs</h2>
            <p className="text-muted-foreground mt-2">Comprehensive audit trail of all data access and modifications</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                All user actions are logged with timestamps, IP addresses, and success status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AccessLogsTable logs={logs} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
