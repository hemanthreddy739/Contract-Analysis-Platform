import React, { useState } from 'react';
import './DocumentUpload.css';

const DocumentUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/documents/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            onUploadSuccess();
            setFile(null);
            e.target.reset();
        } else {
            const data = await response.json();
            alert(`Upload failed: ${data.detail}`);
        }
    };

    return (
        <div
            className={`document-upload-card ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h2>Upload Document</h2>
            <p>Drag & drop your document here, or click to select</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="button button-secondary">
                    {file ? file.name : 'Select File'}
                </label>
                {file && <p className="file-name">Selected: {file.name}</p>}
                <button type="submit" className="button button-primary upload-button" disabled={!file}>Upload</button>
            </form>
        </div>
    );
};

export default DocumentUpload;
