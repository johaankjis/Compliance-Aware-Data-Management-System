import { UploadForm } from "@/components/upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">Upload Dataset</h2>
            <p className="text-muted-foreground mt-2">Upload your CSV file for automatic HIPAA compliance validation</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Data Upload & Validation</CardTitle>
              <CardDescription>
                Your data will be automatically validated against active compliance policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
