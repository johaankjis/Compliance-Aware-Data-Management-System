import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Database, CheckCircle2, XCircle, AlertTriangle, Activity } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDataRecords, getAccessLogs, getCompliancePolicies } from "@/lib/db"
import { Badge } from "@/components/ui/badge"
import { DatasetsList } from "@/components/datasets-list"
import { ComplianceChart } from "@/components/compliance-chart"

export default async function DashboardPage() {
  const [datasets, logs, policies] = await Promise.all([getDataRecords(), getAccessLogs(), getCompliancePolicies()])

  const passedCount = datasets.filter((d) => d.validation_status === "Passed").length
  const failedCount = datasets.filter((d) => d.validation_status === "Failed").length
  const pendingCount = datasets.filter((d) => d.validation_status === "Pending").length
  const totalRecords = datasets.reduce((sum, d) => sum + d.record_count, 0)
  const recentLogs = logs.slice(0, 5)

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
            <h2 className="text-3xl font-bold">Compliance Dashboard</h2>
            <p className="text-muted-foreground mt-2">
              Monitor validation status, access patterns, and compliance metrics
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{datasets.length}</div>
                <p className="text-xs text-muted-foreground">{totalRecords.toLocaleString()} total records</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Passed Validation</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{passedCount}</div>
                <p className="text-xs text-muted-foreground">
                  {((passedCount / datasets.length) * 100).toFixed(0)}% compliance rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Validation</CardTitle>
                <XCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{failedCount}</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground">Awaiting validation</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Data */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Validation Status Overview</CardTitle>
                <CardDescription>Distribution of dataset validation results</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceChart passed={passedCount} failed={failedCount} pending={pendingCount} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Access Activity</CardTitle>
                <CardDescription>Latest user actions and data access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                      <Activity className="h-4 w-4 text-primary mt-1" />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{log.user_name}</p>
                          <Badge variant="outline" className="text-xs">
                            {log.action}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{log.dataset_name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/logs">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Logs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Policies */}
          <Card>
            <CardHeader>
              <CardTitle>Active Compliance Policies</CardTitle>
              <CardDescription>HIPAA policies currently enforced on all datasets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 border border-border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{policy.policy_name}</h4>
                      <Badge variant={policy.is_active ? "default" : "secondary"}>
                        {policy.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{policy.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {policy.policy_type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Datasets List */}
          <Card>
            <CardHeader>
              <CardTitle>All Datasets</CardTitle>
              <CardDescription>Complete list of uploaded datasets and their validation status</CardDescription>
            </CardHeader>
            <CardContent>
              <DatasetsList datasets={datasets} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
