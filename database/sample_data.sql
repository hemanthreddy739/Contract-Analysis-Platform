
INSERT INTO users (username, password_hash, email) VALUES
('testuser', 'hashed_password', 'testuser@example.com');

INSERT INTO documents (user_id, filename, s3_key, file_size, mime_type, status) VALUES
(1, 'sample_contract.pdf', 'sample_contract.pdf', 1024, 'application/pdf', 'uploaded');

INSERT INTO analysis_results (document_id, extracted_info, risks_identified, summary, processing_time) VALUES
(1, '{}', '{}', 'This is a sample summary.', 120);
