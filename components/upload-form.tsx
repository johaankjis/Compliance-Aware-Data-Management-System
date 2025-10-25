"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ValidationResult {
  checkName: string
  result: "Pass" | "Fail" | "Warning"
  details: string
}

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [datasetName, setDatasetName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [validating, setValidating] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [overallStatus, setOverallStatus] = useState<"Passed" | "Failed" | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      if (!datasetName) {
        setDatasetName(e.target.files[0].name.replace(".csv", ""))
      }
    }
  }

  const simulateValidation = async () => {
    setValidating(true)

    // Simulate validation checks
    const checks: ValidationResult[] = [
      {
        checkName: "PHI Identifier Check",
        result: "Pass",
        details: "All 18 HIPAA identifiers properly masked or encrypted",
      },
      {
        checkName: "Data Encryption Validation",
        result: "Pass",
        details: "AES-256 encryption confirmed on sensitive fields",
      },
      {
        checkName: "Access Control Check",
        result: "Pass",
        details: "Proper role-based access control configured",
      },
      {
        checkName: "Null Value Check",
        result: "Warning",
        details: "23 null values found in optional fields",
      },
    ]

    // Simulate progressive validation
    for (let i = 0; i < checks.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setValidationResults((prev) => [...prev, checks[i]])
    }

    const hasFailed = checks.some((c) => c.result === "Fail")
    setOverallStatus(hasFailed ? "Failed" : "Passed")
    setValidating(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !datasetName) return

    setUploading(true)
    setValidationResults([])
    setOverallStatus(null)

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setUploading(false)
    setUploadComplete(true)

    // Start validation
    await simulateValidation()
  }

  const handleReset = () => {
    setFile(null)
    setDatasetName("")
    setUploadComplete(false)
    setValidationResults([])
    setOverallStatus(null)
  }

  return (
    <div className="space-y-6">
      {!uploadComplete ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dataset-name">Dataset Name</Label>
            <Input
              id="dataset-name"
              placeholder="e.g., Patient Demographics Q1 2025"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">CSV File</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                {file ? (
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Click to upload CSV file</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <Button type="submit" disabled={!file || !datasetName || uploading} className="w-full">
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload & Validate
              </>
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>File uploaded successfully. Running compliance validation...</AlertDescription>
          </Alert>

          {validating && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Validating dataset...</span>
                <span className="font-medium">{validationResults.length} / 4 checks</span>
              </div>
              <Progress value={(validationResults.length / 4) * 100} />
            </div>
          )}

          {validationResults.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Validation Results</h3>
              {validationResults.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                  {result.result === "Pass" && <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />}
                  {result.result === "Fail" && <XCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />}
                  {result.result === "Warning" && (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{result.checkName}</p>
                      <Badge
                        variant={
                          result.result === "Pass" ? "default" : result.result === "Fail" ? "destructive" : "secondary"
                        }
                      >
                        {result.result}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{result.details}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {overallStatus && (
            <Alert variant={overallStatus === "Passed" ? "default" : "destructive"}>
              {overallStatus === "Passed" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertDescription>
                {overallStatus === "Passed"
                  ? "Dataset passed all compliance checks and is ready for use."
                  : "Dataset failed compliance validation. Please review and fix the issues before resubmitting."}
              </AlertDescription>
            </Alert>
          )}

          <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
            Upload Another Dataset
          </Button>
        </div>
      )}
    </div>
  )
}
