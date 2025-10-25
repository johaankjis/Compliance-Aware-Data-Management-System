import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Users, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDataRecords, getAccessLogs } from "@/lib/db"
import { AccessTrendsChart } from "@/components/access-trends-chart"
import { UserActivityChart } from "@/components/user-activity-chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ReportsPage() {
  const [datasets, logs] = await Promise.all([getDataRecords(), getAccessLogs()])

  // Calculate metrics
  const totalDatasets = datasets.length
  const passedDatasets = datasets.filter((d) => d.validation_status === "Passed").length
  const complianceRate = ((passedDatasets / totalDatasets) * 100).toFixed(1)
  const totalRecords = datasets.reduce((sum, d) => sum + d.record_count, 0)
  const maskedDatasets = datasets.filter((d) => d.pii_masked).length
  const maskingRate = ((maskedDatasets / totalDatasets) * 100).toFixed(1)

  // User activity metrics
  const uniqueUsers = new Set(logs.map((log) => log.user_id)).size
  const totalActions = logs.length

  // Access by action type
  const actionCounts = logs.reduce(
    (acc, log) => {
      acc[log.action] = (acc[log.action] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Reports & Analytics</h2>
              <p className="text-muted-foreground mt-2">Comprehensive compliance metrics and access analytics</p>
            </div>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>

          <Tabs defaultValue="compliance" className="space-y-6">
            <TabsList>
              <TabsTrigger value="compliance">Compliance Metrics</TabsTrigger>
              <TabsTrigger value="access">Access Analytics</TabsTrigger>
              <TabsTrigger value="users">User Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="space-y-6">
              {/* Compliance Stats */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{complianceRate}%</div>
                    <p className="text-xs text-muted-foreground">
                      {passedDatasets} of {totalDatasets} datasets
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">PII Masking Rate</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{maskingRate}%</div>
                    <p className="text-xs text-muted-foreground">{maskedDatasets} datasets masked</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Records</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Across all datasets</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{uniqueUsers}</div>
                    <p className="text-xs text-muted-foreground">{totalActions} total actions</p>
                  </CardContent>
                </Card>
              </div>

              {/* Compliance Details */}
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Validation Status Breakdown</CardTitle>
                    <CardDescription>Detailed compliance metrics by validation result</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          status: "Passed",
                          count: datasets.filter((d) => d.validation_status === "Passed").length,
                          color: "bg-green-500",
                        },
                        {
                          status: "Failed",
                          count: datasets.filter((d) => d.validation_status === "Failed").length,
                          color: "bg-red-500",
                        },
                        {
                          status: "Pending",
                          count: datasets.filter((d) => d.validation_status === "Pending").length,
                          color: "bg-yellow-500",
                        },
                      ].map((item) => (
                        <div key={item.status} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.status}</span>
                            <span className="text-muted-foreground">
                              {item.count} ({((item.count / totalDatasets) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${(item.count / totalDatasets) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Policy Adherence</CardTitle>
                    <CardDescription>Compliance with HIPAA policies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { policy: "PHI Masking", adherence: 87 },
                        { policy: "Data Encryption", adherence: 100 },
                        { policy: "Access Control", adherence: 95 },
                      ].map((item) => (
                        <div key={item.policy} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.policy}</span>
                            <span className="text-muted-foreground">{item.adherence}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary" style={{ width: `${item.adherence}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="access" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Access Trends</CardTitle>
                    <CardDescription>Data access patterns over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AccessTrendsChart logs={logs} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Actions by Type</CardTitle>
                    <CardDescription>Distribution of access actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(actionCounts)
                        .sort(([, a], [, b]) => b - a)
                        .map(([action, count]) => (
                          <div key={action} className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">{action}</span>
                              <span className="text-muted-foreground">
                                {count} ({((count / totalActions) * 100).toFixed(0)}%)
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${(count / totalActions) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Access Logs</CardTitle>
                  <CardDescription>Latest data access events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {logs.slice(0, 10).map((log) => (
                      <div
                        key={log.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{log.user_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {log.action} - {log.dataset_name}
                          </p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString()}</p>
                          <p className="text-xs font-mono text-muted-foreground">{log.ip_address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link href="/logs">
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View All Logs
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Overview</CardTitle>
                  <CardDescription>Actions performed by each user</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserActivityChart logs={logs} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                  <CardDescription>Detailed breakdown by user role</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Researcher", "Data Manager", "Security Officer"].map((role) => {
                      const roleCount = logs.filter((log) => log.user_role === role).length
                      return (
                        <div key={role} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{role}</span>
                            <span className="text-muted-foreground">
                              {roleCount} actions ({((roleCount / totalActions) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(roleCount / totalActions) * 100}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
