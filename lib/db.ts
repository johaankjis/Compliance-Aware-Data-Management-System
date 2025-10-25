// Mock database functions for the MVP
// In production, this would connect to PostgreSQL

export interface DataRecord {
  id: number
  dataset_name: string
  owner_id: number
  owner_name: string
  created_at: string
  validation_status: "Passed" | "Failed" | "Pending"
  pii_masked: boolean
  file_size_kb: number
  record_count: number
  error_message?: string
}

export interface AccessLog {
  id: number
  user_id: number
  user_name: string
  user_role: string
  action: string
  dataset_id: number
  dataset_name: string
  timestamp: string
  ip_address: string
  success: boolean
}

export interface ValidationResult {
  id: number
  dataset_id: number
  policy_id: number
  check_name: string
  check_result: "Pass" | "Fail" | "Warning"
  details: string
  checked_at: string
}

export interface CompliancePolicy {
  id: number
  policy_name: string
  policy_type: string
  description: string
  is_active: boolean
}

// Mock data - in production this would query PostgreSQL
export async function getDataRecords(): Promise<DataRecord[]> {
  return [
    {
      id: 1,
      dataset_name: "Patient Demographics Q1 2025",
      owner_id: 101,
      owner_name: "Dr. Sarah Chen",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Passed",
      pii_masked: true,
      file_size_kb: 2048,
      record_count: 15420,
    },
    {
      id: 2,
      dataset_name: "Clinical Trial Results - Study A",
      owner_id: 102,
      owner_name: "Dr. Michael Rodriguez",
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Passed",
      pii_masked: true,
      file_size_kb: 5120,
      record_count: 8934,
    },
    {
      id: 3,
      dataset_name: "Lab Results Dataset",
      owner_id: 103,
      owner_name: "Dr. Emily Watson",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Failed",
      pii_masked: false,
      file_size_kb: 1024,
      record_count: 3200,
      error_message: "PHI identifiers not properly masked",
    },
    {
      id: 4,
      dataset_name: "Medication Records 2024",
      owner_id: 101,
      owner_name: "Dr. Sarah Chen",
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Passed",
      pii_masked: true,
      file_size_kb: 3072,
      record_count: 22100,
    },
    {
      id: 5,
      dataset_name: "Imaging Study Metadata",
      owner_id: 104,
      owner_name: "Dr. James Park",
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      validation_status: "Pending",
      pii_masked: true,
      file_size_kb: 896,
      record_count: 1850,
    },
    {
      id: 6,
      dataset_name: "Genomic Research Data",
      owner_id: 105,
      owner_name: "Dr. Lisa Anderson",
      created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Passed",
      pii_masked: true,
      file_size_kb: 8192,
      record_count: 5600,
    },
    {
      id: 7,
      dataset_name: "Patient Survey Responses",
      owner_id: 102,
      owner_name: "Dr. Michael Rodriguez",
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      validation_status: "Failed",
      pii_masked: false,
      file_size_kb: 512,
      record_count: 4200,
      error_message: "Email addresses not anonymized",
    },
    {
      id: 8,
      dataset_name: "Electronic Health Records",
      owner_id: 103,
      owner_name: "Dr. Emily Watson",
      created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      validation_status: "Passed",
      pii_masked: true,
      file_size_kb: 15360,
      record_count: 45000,
    },
  ]
}

export async function getAccessLogs(): Promise<AccessLog[]> {
  return [
    {
      id: 1,
      user_id: 101,
      user_name: "Dr. Sarah Chen",
      user_role: "Researcher",
      action: "VIEW",
      dataset_id: 1,
      dataset_name: "Patient Demographics Q1 2025",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      ip_address: "192.168.1.45",
      success: true,
    },
    {
      id: 2,
      user_id: 102,
      user_name: "Dr. Michael Rodriguez",
      user_role: "Researcher",
      action: "UPLOAD",
      dataset_id: 2,
      dataset_name: "Clinical Trial Results - Study A",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      ip_address: "192.168.1.67",
      success: true,
    },
    {
      id: 3,
      user_id: 201,
      user_name: "Jane Smith",
      user_role: "Data Manager",
      action: "VALIDATE",
      dataset_id: 3,
      dataset_name: "Lab Results Dataset",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      ip_address: "192.168.1.89",
      success: true,
    },
    {
      id: 4,
      user_id: 101,
      user_name: "Dr. Sarah Chen",
      user_role: "Researcher",
      action: "DOWNLOAD",
      dataset_id: 4,
      dataset_name: "Medication Records 2024",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      ip_address: "192.168.1.45",
      success: true,
    },
    {
      id: 5,
      user_id: 301,
      user_name: "Robert Johnson",
      user_role: "Security Officer",
      action: "AUDIT",
      dataset_id: 1,
      dataset_name: "Patient Demographics Q1 2025",
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      ip_address: "192.168.1.12",
      success: true,
    },
  ]
}

export async function getValidationResults(datasetId: number): Promise<ValidationResult[]> {
  const allResults: ValidationResult[] = [
    {
      id: 1,
      dataset_id: 1,
      policy_id: 1,
      check_name: "PHI Identifier Check",
      check_result: "Pass",
      details: "All 18 HIPAA identifiers properly masked",
      checked_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      dataset_id: 1,
      policy_id: 2,
      check_name: "Encryption Validation",
      check_result: "Pass",
      details: "AES-256 encryption confirmed on sensitive fields",
      checked_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      dataset_id: 3,
      policy_id: 1,
      check_name: "PHI Identifier Check",
      check_result: "Fail",
      details: "Found 12 unmasked SSN values in column patient_ssn",
      checked_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 4,
      dataset_id: 3,
      policy_id: 7,
      check_name: "Null Value Check",
      check_result: "Warning",
      details: "45 null values found in date_of_birth field",
      checked_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return allResults.filter((r) => r.dataset_id === datasetId)
}

export async function getCompliancePolicies(): Promise<CompliancePolicy[]> {
  return [
    {
      id: 1,
      policy_name: "HIPAA PHI Masking",
      policy_type: "HIPAA",
      description: "Ensures all Protected Health Information (PHI) identifiers are masked or encrypted",
      is_active: true,
    },
    {
      id: 2,
      policy_name: "Data Encryption at Rest",
      policy_type: "HIPAA",
      description: "Validates that sensitive data fields are encrypted using AES-256",
      is_active: true,
    },
    {
      id: 3,
      policy_name: "Access Control Validation",
      policy_type: "HIPAA",
      description: "Ensures proper role-based access control is enforced",
      is_active: true,
    },
  ]
}

export async function createDataRecord(data: {
  dataset_name: string
  owner_name: string
  file_size_kb: number
  record_count: number
}): Promise<DataRecord> {
  const newRecord: DataRecord = {
    id: Math.floor(Math.random() * 10000),
    dataset_name: data.dataset_name,
    owner_id: Math.floor(Math.random() * 1000),
    owner_name: data.owner_name,
    created_at: new Date().toISOString(),
    validation_status: "Pending",
    pii_masked: false,
    file_size_kb: data.file_size_kb,
    record_count: data.record_count,
  }
  return newRecord
}

export async function logAccess(data: {
  user_name: string
  user_role: string
  action: string
  dataset_id: number
  dataset_name: string
}): Promise<AccessLog> {
  const newLog: AccessLog = {
    id: Math.floor(Math.random() * 10000),
    user_id: Math.floor(Math.random() * 1000),
    user_name: data.user_name,
    user_role: data.user_role,
    action: data.action,
    dataset_id: data.dataset_id,
    dataset_name: data.dataset_name,
    timestamp: new Date().toISOString(),
    ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
    success: true,
  }
  return newLog
}
