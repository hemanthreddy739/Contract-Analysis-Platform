
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    filename VARCHAR(255) NOT NULL,
    s3_key VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    file_size INTEGER NOT NULL,
    mime_type VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE analysis_results (
    id SERIAL PRIMARY KEY,
    document_id INTEGER NOT NULL,
    extracted_info JSONB,
    risks_identified JSONB,
    summary TEXT,
    analysis_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processing_time INTEGER,
    FOREIGN KEY (document_id) REFERENCES documents (id)
);
