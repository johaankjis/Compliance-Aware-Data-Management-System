"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { AccessLog } from "@/lib/db"
import { CheckCircle2, XCircle, Search } from "lucide-react"

interface AccessLogsTableProps {
  logs: AccessLog[]
}

export function AccessLogsTable({ logs }: AccessLogsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.dataset_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip_address.includes(searchTerm)

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesRole = roleFilter === "all" || log.user_role === roleFilter

    return matchesSearch && matchesAction && matchesRole
  })

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "VIEW":
        return "default"
      case "UPLOAD":
        return "secondary"
      case "DOWNLOAD":
        return "secondary"
      case "VALIDATE":
        return "default"
      case "AUDIT":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user, dataset, or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="VIEW">View</SelectItem>
            <SelectItem value="UPLOAD">Upload</SelectItem>
            <SelectItem value="DOWNLOAD">Download</SelectItem>
            <SelectItem value="VALIDATE">Validate</SelectItem>
            <SelectItem value="AUDIT">Audit</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Researcher">Researcher</SelectItem>
            <SelectItem value="Data Manager">Data Manager</SelectItem>
            <SelectItem value="Security Officer">Security Officer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Dataset</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No logs found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{formatTimestamp(log.timestamp)}</TableCell>
                  <TableCell className="font-medium">{log.user_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.user_role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionColor(log.action)}>{log.action}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{log.dataset_name}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ip_address}</TableCell>
                  <TableCell>
                    {log.success ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredLogs.length} of {logs.length} logs
      </div>
    </div>
  )
}
