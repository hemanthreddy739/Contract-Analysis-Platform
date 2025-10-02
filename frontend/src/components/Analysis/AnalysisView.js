import React, { useState, useEffect } from 'react';

const AnalysisView = ({ documentId }) => {
    const [analysis, setAnalysis] = useState(null);

    useEffect(() => {
        if (documentId) {
            const fetchAnalysis = async () => {
                const response = await fetch(`/api/documents/${documentId}`);
                const data = await response.json();
                setAnalysis(data);
            };
            fetchAnalysis();
        }
    }, [documentId]);

    if (!analysis) {
        return <div>Select a document to view its analysis.</div>;
    }

    return (
        <div>
            <h2>Analysis for {analysis.filename}</h2>
            <h3>Summary</h3>
            <p>{analysis.analysis_results.length > 0 ? analysis.analysis_results[0].summary : 'Not yet analyzed'}</p>
            <h3>Key Information</h3>
            <pre>{analysis.analysis_results.length > 0 ? JSON.stringify(analysis.analysis_results[0].extracted_info, null, 2) : 'Not yet analyzed'}</pre>
            <h3>Risk Assessment</h3>
            <pre>{analysis.analysis_results.length > 0 ? JSON.stringify(analysis.analysis_results[0].risks_identified, null, 2) : 'Not yet analyzed'}</pre>
        </div>
    );
};

export default AnalysisView;
