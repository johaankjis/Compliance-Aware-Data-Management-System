"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { DataRecord } from "@/lib/db"
import { CheckCircle2, XCircle, Clock, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DatasetsListProps {
  datasets: DataRecord[]
}

export function DatasetsList({ datasets }: DatasetsListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.dataset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.owner_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Passed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "Failed":
        return <XCircle className="h-4 w-4 text-destructive" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string): "default" | "destructive" | "secondary" => {
    switch (status) {
      case "Passed":
        return "default"
      case "Failed":
        return "destructive"
      case "Pending":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search datasets by name or owner..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>PII Masked</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDatasets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  No datasets found
                </TableCell>
              </TableRow>
            ) : (
              filteredDatasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium max-w-[250px]">
                    <div className="truncate">{dataset.dataset_name}</div>
                    {dataset.error_message && (
                      <div className="text-xs text-destructive mt-1">{dataset.error_message}</div>
                    )}
                  </TableCell>
                  <TableCell>{dataset.owner_name}</TableCell>
                  <TableCell className="text-sm">{formatDate(dataset.created_at)}</TableCell>
                  <TableCell className="font-mono text-sm">{dataset.record_count.toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-sm">{dataset.file_size_kb} KB</TableCell>
                  <TableCell>
                    <Badge variant={dataset.pii_masked ? "default" : "destructive"}>
                      {dataset.pii_masked ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(dataset.validation_status)}
                      <Badge variant={getStatusVariant(dataset.validation_status)}>{dataset.validation_status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredDatasets.length} of {datasets.length} datasets
      </div>
    </div>
  )
}
