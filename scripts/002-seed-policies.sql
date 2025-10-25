-- Insert default HIPAA compliance policies
INSERT INTO compliance_policies (policy_name, policy_type, description, is_active) VALUES
  ('HIPAA PHI Masking', 'HIPAA', 'Ensures all Protected Health Information (PHI) identifiers are masked or encrypted', TRUE),
  ('Data Encryption at Rest', 'HIPAA', 'Validates that sensitive data fields are encrypted using AES-256', TRUE),
  ('Access Control Validation', 'HIPAA', 'Ensures proper role-based access control is enforced', TRUE),
  ('Audit Trail Completeness', 'HIPAA', 'Verifies all data access is logged with user, timestamp, and action', TRUE),
  ('Minimum Necessary Standard', 'HIPAA', 'Checks that data access follows minimum necessary principle', TRUE),
  ('Schema Validation', 'Internal', 'Validates dataset schema matches expected structure', TRUE),
  ('Null Value Check', 'Internal', 'Identifies and reports null values in required fields', TRUE),
  ('Data Quality Check', 'Internal', 'Validates data quality metrics like completeness and consistency', TRUE)
ON CONFLICT (policy_name) DO NOTHING;
