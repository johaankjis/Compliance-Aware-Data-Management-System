-- Insert sample data records
INSERT INTO data_records (dataset_name, owner_id, owner_name, validation_status, pii_masked, file_size_kb, record_count, created_at) VALUES
  ('Patient Demographics Q1 2025', 101, 'Dr. Sarah Chen', 'Passed', TRUE, 2048, 15420, NOW() - INTERVAL '2 days'),
  ('Clinical Trial Results - Study A', 102, 'Dr. Michael Rodriguez', 'Passed', TRUE, 5120, 8934, NOW() - INTERVAL '5 days'),
  ('Lab Results Dataset', 103, 'Dr. Emily Watson', 'Failed', FALSE, 1024, 3200, NOW() - INTERVAL '1 day'),
  ('Medication Records 2024', 101, 'Dr. Sarah Chen', 'Passed', TRUE, 3072, 22100, NOW() - INTERVAL '7 days'),
  ('Imaging Study Metadata', 104, 'Dr. James Park', 'Pending', TRUE, 896, 1850, NOW() - INTERVAL '3 hours'),
  ('Genomic Research Data', 105, 'Dr. Lisa Anderson', 'Passed', TRUE, 8192, 5600, NOW() - INTERVAL '10 days'),
  ('Patient Survey Responses', 102, 'Dr. Michael Rodriguez', 'Failed', FALSE, 512, 4200, NOW() - INTERVAL '6 hours'),
  ('Electronic Health Records', 103, 'Dr. Emily Watson', 'Passed', TRUE, 15360, 45000, NOW() - INTERVAL '14 days');

-- Insert sample access logs
INSERT INTO access_logs (user_id, user_name, user_role, action, dataset_id, dataset_name, timestamp, ip_address, success) VALUES
  (101, 'Dr. Sarah Chen', 'Researcher', 'VIEW', 1, 'Patient Demographics Q1 2025', NOW() - INTERVAL '1 hour', '192.168.1.45', TRUE),
  (102, 'Dr. Michael Rodriguez', 'Researcher', 'UPLOAD', 2, 'Clinical Trial Results - Study A', NOW() - INTERVAL '5 days', '192.168.1.67', TRUE),
  (201, 'Jane Smith', 'Data Manager', 'VALIDATE', 3, 'Lab Results Dataset', NOW() - INTERVAL '1 day', '192.168.1.89', TRUE),
  (101, 'Dr. Sarah Chen', 'Researcher', 'DOWNLOAD', 4, 'Medication Records 2024', NOW() - INTERVAL '2 hours', '192.168.1.45', TRUE),
  (301, 'Robert Johnson', 'Security Officer', 'AUDIT', 1, 'Patient Demographics Q1 2025', NOW() - INTERVAL '30 minutes', '192.168.1.12', TRUE),
  (103, 'Dr. Emily Watson', 'Researcher', 'UPLOAD', 3, 'Lab Results Dataset', NOW() - INTERVAL '1 day', '192.168.1.34', TRUE),
  (104, 'Dr. James Park', 'Researcher', 'UPLOAD', 5, 'Imaging Study Metadata', NOW() - INTERVAL '3 hours', '192.168.1.56', TRUE),
  (201, 'Jane Smith', 'Data Manager', 'VIEW', 8, 'Electronic Health Records', NOW() - INTERVAL '4 hours', '192.168.1.89', TRUE),
  (105, 'Dr. Lisa Anderson', 'Researcher', 'VALIDATE', 6, 'Genomic Research Data', NOW() - INTERVAL '10 days', '192.168.1.78', TRUE),
  (102, 'Dr. Michael Rodriguez', 'Researcher', 'UPLOAD', 7, 'Patient Survey Responses', NOW() - INTERVAL '6 hours', '192.168.1.67', TRUE);

-- Insert sample validation results
INSERT INTO validation_results (dataset_id, policy_id, check_name, check_result, details, checked_at) VALUES
  (1, 1, 'PHI Identifier Check', 'Pass', 'All 18 HIPAA identifiers properly masked', NOW() - INTERVAL '2 days'),
  (1, 2, 'Encryption Validation', 'Pass', 'AES-256 encryption confirmed on sensitive fields', NOW() - INTERVAL '2 days'),
  (1, 6, 'Schema Validation', 'Pass', 'Schema matches expected structure', NOW() - INTERVAL '2 days'),
  (3, 1, 'PHI Identifier Check', 'Fail', 'Found 12 unmasked SSN values in column patient_ssn', NOW() - INTERVAL '1 day'),
  (3, 7, 'Null Value Check', 'Warning', '45 null values found in date_of_birth field', NOW() - INTERVAL '1 day'),
  (7, 1, 'PHI Identifier Check', 'Fail', 'Email addresses not properly anonymized', NOW() - INTERVAL '6 hours'),
  (7, 2, 'Encryption Validation', 'Fail', 'Sensitive fields not encrypted', NOW() - INTERVAL '6 hours'),
  (8, 1, 'PHI Identifier Check', 'Pass', 'All identifiers properly handled', NOW() - INTERVAL '14 days'),
  (8, 3, 'Access Control Validation', 'Pass', 'RBAC properly configured', NOW() - INTERVAL '14 days');
