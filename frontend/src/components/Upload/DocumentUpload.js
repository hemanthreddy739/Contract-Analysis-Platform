import React, { useState } from 'react';

const DocumentUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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

        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Document</h2>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default DocumentUpload;
