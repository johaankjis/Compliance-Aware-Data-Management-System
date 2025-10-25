-- Create data_records table for storing dataset information
CREATE TABLE IF NOT EXISTS data_records (
  id SERIAL PRIMARY KEY,
  dataset_name TEXT NOT NULL,
  owner_id INT NOT NULL,
  owner_name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  validation_status TEXT CHECK (validation_status IN ('Passed', 'Failed', 'Pending')) DEFAULT 'Pending',
  pii_masked BOOLEAN DEFAULT TRUE,
  file_size_kb INT,
  record_count INT,
  error_message TEXT
);

-- Create access_logs table for tracking all data access
CREATE TABLE IF NOT EXISTS access_logs (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  user_name TEXT NOT NULL,
  user_role TEXT NOT NULL,
  action TEXT NOT NULL,
  dataset_id INT REFERENCES data_records(id) ON DELETE CASCADE,
  dataset_name TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address TEXT,
  success BOOLEAN DEFAULT TRUE
);

-- Create compliance_policies table for storing policy rules
CREATE TABLE IF NOT EXISTS compliance_policies (
  id SERIAL PRIMARY KEY,
  policy_name TEXT NOT NULL UNIQUE,
  policy_type TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create validation_results table for detailed validation logs
CREATE TABLE IF NOT EXISTS validation_results (
  id SERIAL PRIMARY KEY,
  dataset_id INT REFERENCES data_records(id) ON DELETE CASCADE,
  policy_id INT REFERENCES compliance_policies(id),
  check_name TEXT NOT NULL,
  check_result TEXT CHECK (check_result IN ('Pass', 'Fail', 'Warning')),
  details TEXT,
  checked_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_data_records_owner ON data_records(owner_id);
CREATE INDEX IF NOT EXISTS idx_data_records_status ON data_records(validation_status);
CREATE INDEX IF NOT EXISTS idx_access_logs_user ON access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_dataset ON access_logs(dataset_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_timestamp ON access_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_validation_results_dataset ON validation_results(dataset_id);
