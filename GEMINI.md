# Gemini CLI Prompts for LLM-Powered Contract Analysis Platform

## Project Overview
Build an end-to-end web application for **Intelligent Contract Analysis Platform** that allows legal teams and compliance officers to upload complex documents like contracts and loan agreements. The application will automatically extract key information, highlight potential risks, and generate concise summaries using Gemini LLM.

## Architecture
- **Frontend**: React (No Material UI, TypeScript, or complex libraries)
- **Backend**: Python REST API with FastAPI
- **Database**: PostgreSQL
- **Storage**: AWS S3 for document storage
- **LLM**: Google Gemini for document analysis
- **Deployment**: Docker Compose for single environment
- **Authentication**: Simple username/password (no JWT)

---

## Prompt 1: Project Structure Setup

```
Create a complete project structure for an LLM-powered contract analysis web application with the following requirements:

1. Frontend: React application (simple, no Material UI or TypeScript)
2. Backend: Python FastAPI REST API
3. Database: PostgreSQL
4. Document storage: AWS S3 integration
5. LLM: Google Gemini API integration
6. Docker Compose setup for all services

Please create the following directory structure:

```
contract-analysis-platform/
├── frontend/
├── backend/
├── database/
├── docker-compose.yml
├── .env.example
└── README.md
```

Include basic configuration files and folder structure for each component.
```

---

## Prompt 2: Database Schema Design

```
Design a PostgreSQL database schema for the contract analysis platform with the following requirements:

1. Users table (id, username, password_hash, email, created_at)
2. Documents table (id, user_id, filename, s3_key, upload_date, file_size, mime_type, status)
3. Analysis_results table (id, document_id, extracted_info, risks_identified, summary, analysis_date, processing_time)

Create:
1. SQL schema file with CREATE TABLE statements
2. Database initialization script
3. Sample data insertion script

Store files in: database/init.sql and database/sample_data.sql
```

---

## Prompt 3: Backend API Development

```
Create a Python FastAPI backend application for contract analysis with these requirements:

1. **Dependencies**: FastAPI, SQLAlchemy, PostgreSQL driver, AWS boto3, Google Generative AI, bcrypt, python-multipart
2. **Authentication**: Simple session-based auth (no JWT)
3. **Database**: PostgreSQL with SQLAlchemy ORM
4. **AWS S3**: File upload and storage integration
5. **Gemini AI**: Document analysis and summarization

**API Endpoints needed**:
- POST /auth/login - User login
- POST /auth/logout - User logout
- POST /auth/register - User registration
- POST /documents/upload - Upload document to S3 and trigger analysis
- GET /documents - List user's documents
- GET /documents/{id} - Get document details and analysis
- GET /documents/{id}/download - Download document from S3
- POST /documents/{id}/analyze - Re-analyze document

**Key Features**:
- File validation (PDF, DOC, DOCX)
- Asynchronous document processing
- Error handling and logging
- CORS configuration for frontend
- Environment variables for configuration

Create the complete backend code structure with all files in backend/ directory.
```

---

## Prompt 4: Gemini LLM Integration

```
Create a comprehensive document analysis service using Google Gemini LLM for the contract analysis platform:

**Requirements**:
1. **Document Processing**: Extract text from PDF, DOC, DOCX files
2. **Gemini Integration**: Use Google Generative AI library
3. **Analysis Functions**:
   - Extract key contract information (parties, dates, amounts, terms)
   - Identify potential risks and red flags
   - Generate concise executive summaries
   - Highlight important clauses

**Create**:
1. `backend/services/document_processor.py` - Text extraction from various file formats
2. `backend/services/gemini_analyzer.py` - Gemini LLM integration and analysis
3. `backend/services/analysis_service.py` - Orchestrate document analysis workflow

**Analysis Prompts for Gemini**:
- **Key Information Extraction**: "Analyze this contract and extract key information including parties involved, contract dates, monetary amounts, key terms and conditions, and important deadlines."
- **Risk Assessment**: "Identify potential legal risks, unfavorable terms, and red flags in this contract that require attention from legal teams."
- **Summary Generation**: "Generate a concise executive summary of this contract highlighting the most critical points for quick review."

Include proper error handling, logging, and async processing.
```

---

## Prompt 5: Frontend React Application

```
Create a simple and clean React frontend application for the contract analysis platform:

**Requirements**:
1. **No external UI libraries** - Use vanilla CSS and HTML
2. **Components needed**:
   - Login/Register forms
   - Document upload interface
   - Document list/dashboard
   - Document analysis viewer
   - Navigation header

**Pages/Components**:
1. `src/components/Auth/Login.js` - Login form
2. `src/components/Auth/Register.js` - Registration form
3. `src/components/Dashboard/Dashboard.js` - Main dashboard with document list
4. `src/components/Upload/DocumentUpload.js` - File upload interface
5. `src/components/Analysis/AnalysisView.js` - Display analysis results
6. `src/components/Layout/Header.js` - Navigation header
7. `src/App.js` - Main app with routing

**Features**:
- Simple, clean UI with basic CSS
- File drag-and-drop upload
- Real-time upload progress
- Document status indicators
- Analysis results display with sections for key info, risks, and summary
- Responsive design
- Error handling and loading states

**Styling**: Use clean, professional CSS with a modern look. No animations or complex styling.

Create all necessary files in frontend/src/ directory.
```

---

## Prompt 6: Docker Compose Configuration

```
Create a comprehensive Docker Compose setup for the contract analysis platform:

**Services Required**:
1. **Frontend**: React app served with nginx
2. **Backend**: Python FastAPI application
3. **Database**: PostgreSQL with initialization
4. **Volumes**: Persistent storage for database

**Requirements**:
1. Single environment configuration
2. Automatic database initialization
3. CORS handling between frontend and backend
4. Environment variables management
5. Network configuration for service communication
6. Health checks for all services

**Files to create**:
1. `docker-compose.yml` - Main compose file
2. `frontend/Dockerfile` - React app containerization
3. `backend/Dockerfile` - Python API containerization
4. `frontend/nginx.conf` - Nginx configuration for React app
5. `.env.example` - Environment variables template

**Environment Variables needed**:
- Database credentials
- AWS S3 configuration
- Google Gemini API key
- Backend API URL
- CORS origins

Ensure all services can communicate properly and the application starts with a single `docker-compose up` command.
```

---

## Prompt 7: AWS S3 Integration

```
Create comprehensive AWS S3 integration for document storage in the contract analysis platform:

**Requirements**:
1. **S3 Service Class**: Upload, download, delete operations
2. **File Validation**: Size limits, type checking, virus scanning considerations
3. **Secure URLs**: Generate pre-signed URLs for document access
4. **Error Handling**: Proper exception handling for S3 operations

**Create**:
1. `backend/services/s3_service.py` - S3 operations wrapper
2. `backend/config/aws_config.py` - AWS configuration
3. File upload utility functions
4. Security considerations for file handling

**Features**:
- Organized file structure in S3 (user-based folders)
- File metadata storage
- Secure upload and download
- File cleanup on document deletion
- Progress tracking for large files
- Support for multiple file formats (PDF, DOC, DOCX)

Include proper error handling, logging, and security best practices.
```

---

## Prompt 8: Authentication System

```
Create a simple authentication system for the contract analysis platform:

**Requirements**:
1. **No JWT** - Use session-based authentication
2. **Password Security**: Hash passwords with bcrypt
3. **Session Management**: Simple session handling
4. **Middleware**: Authentication middleware for protected routes

**Components**:
1. `backend/auth/auth_service.py` - Authentication logic
2. `backend/auth/password_utils.py` - Password hashing utilities
3. `backend/middleware/auth_middleware.py` - Authentication middleware
4. `backend/models/user.py` - User model

**Features**:
- User registration with validation
- Secure password hashing
- Login/logout functionality
- Protected route middleware
- User session management
- Basic user profile management

**Frontend Integration**:
- Login/register forms
- Authentication context
- Protected routes
- User session persistence
- Logout functionality

Keep it simple and secure without complex JWT implementation.
```

---

## Prompt 9: Error Handling and Logging

```
Implement comprehensive error handling and logging system for the contract analysis platform:

**Backend Logging**:
1. `backend/utils/logger.py` - Centralized logging configuration
2. API request/response logging
3. Error tracking and monitoring
4. File operation logging
5. LLM interaction logging

**Frontend Error Handling**:
1. Global error boundary
2. API error handling
3. User-friendly error messages
4. Loading states and error states
5. Form validation errors

**Features**:
- Structured logging with timestamps
- Different log levels (INFO, WARNING, ERROR)
- Log file rotation
- Error notifications to users
- Debugging information for development

**Error Scenarios to Handle**:
- File upload failures
- S3 connection issues
- Database connection errors
- LLM API failures
- Authentication errors
- Network timeouts

Create comprehensive error handling across all application layers.
```

---

## Prompt 10: Testing and Documentation

```
Create testing setup and documentation for the contract analysis platform:

**Backend Testing**:
1. Unit tests for API endpoints
2. Database operation tests
3. S3 integration tests
4. LLM service tests
5. Authentication tests

**Frontend Testing**:
1. Component tests
2. User interaction tests
3. API integration tests

**Documentation**:
1. README.md with setup instructions
2. API documentation
3. Deployment guide
4. Environment configuration guide
5. Troubleshooting guide

**Files to create**:
- `backend/tests/` directory with test files
- `frontend/src/tests/` directory
- `docs/` directory with documentation
- Updated README.md with comprehensive setup guide

Include testing commands in package.json and requirements for running tests.
```

---

## Prompt 11: Final Integration and Deployment

```
Create the final integration setup and deployment instructions:

**Integration Tasks**:
1. Ensure all services communicate properly
2. CORS configuration verification
3. Environment variables setup
4. Database migrations
5. S3 bucket configuration
6. Gemini API setup

**Deployment Files**:
1. Complete `.env.example` with all required variables
2. `scripts/setup.sh` - Initial setup script
3. `scripts/deploy.sh` - Deployment script
4. Health check endpoints
5. Monitoring setup

**Final Testing**:
1. End-to-end workflow testing
2. File upload and analysis pipeline
3. User authentication flow
4. Error scenario testing
5. Performance testing

**Documentation Updates**:
- Complete README.md
- Troubleshooting guide
- API documentation
- User manual

Provide step-by-step instructions for setting up the entire application from scratch.
```

---

## Environment Variables Required

Create `.env` file with these variables:

```
# Database
DB_HOST=postgres
DB_NAME=contract_analysis
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-contract-analysis-bucket

# Google Gemini
GOOGLE_API_KEY=your_gemini_api_key

# Backend
BACKEND_URL=http://localhost:8000
SECRET_KEY=your_secret_key_for_sessions

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

---

## Setup Commands

1. **Clone and setup project structure**
2. **Create environment file**: `cp .env.example .env` and update values
3. **Start services**: `docker-compose up --build`
4. **Access application**: Frontend at http://localhost:3000, Backend at http://localhost:8000

---

## Key Features Summary

✅ **Simple Architecture**: React frontend, Python FastAPI backend, PostgreSQL database  
✅ **Document Processing**: Upload to S3, extract text, analyze with Gemini LLM  
✅ **Analysis Features**: Key information extraction, risk identification, summary generation  
✅ **Authentication**: Simple username/password authentication  
✅ **Storage**: AWS S3 for secure document storage  
✅ **Deployment**: Single Docker Compose command deployment  
✅ **No Complexity**: No JWT, Redis, Material UI, TypeScript, or multiple environments  

This provides a complete, production-ready contract analysis platform using the "vibe coding" methodology with clean, simple implementation.

