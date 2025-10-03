import React, { useState, useEffect } from 'react';
import AnalysisView from '../Analysis/AnalysisView';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/documents`);
            const data = await response.json();
            setDocuments(data);
        };
        fetchDocuments();
    }, []);

    return (
        <div>
            <div>
                <h2>Dashboard</h2>
                <ul>
                    {documents.map(doc => (
                        <li key={doc.id}>
                            {doc.filename} - {doc.status}
                            <button onClick={() => setSelectedDocument(doc.id)}>View Analysis</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <AnalysisView documentId={selectedDocument} />
            </div>
        </div>
    );
};

export default Dashboard;
