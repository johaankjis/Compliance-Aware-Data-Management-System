import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Upload, FileSearch, BarChart3, Lock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Compliance Data System</h1>
          </div>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Lock className="h-4 w-4" />
            HIPAA Compliant
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Secure Data Management with Built-in Compliance
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Upload, validate, and manage sensitive healthcare data with automated HIPAA compliance checks and
            comprehensive audit logging.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/upload">
              <Button size="lg" className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Dataset
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Upload className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Data Upload & Validation</CardTitle>
              <CardDescription>
                Upload CSV files with automatic validation against HIPAA compliance policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• PHI identifier detection</li>
                <li>• Automatic data masking</li>
                <li>• Real-time validation feedback</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileSearch className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Access Logging</CardTitle>
              <CardDescription>Comprehensive audit trail of all data access and modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• User activity tracking</li>
                <li>• IP address logging</li>
                <li>• Timestamp records</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>Generate detailed compliance reports and analytics dashboards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Validation metrics</li>
                <li>• Access patterns</li>
                <li>• Policy adherence</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
