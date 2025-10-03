import React, { useState, useEffect } from 'react';

const AnalysisView = ({ document }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (document && document.id) {
            const fetchAnalysis = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`/api/documents/${document.id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setAnalysis(data);
                } catch (e) {
                    setError("Failed to fetch analysis: " + e.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchAnalysis();
        } else {
            setAnalysis(null);
        }
    }, [document]);

    if (!document) {
        return <div className="analysis-message">Select a document to view its analysis.</div>;
    }

    if (loading) {
        return <div className="analysis-message">Loading analysis for {document.filename}...</div>;
    }

    if (error) {
        return <div className="analysis-message error">{error}</div>;
    }

    if (!analysis) {
        return <div className="analysis-message">No analysis available for this document.</div>;
    }

    const latestAnalysis = analysis.analysis_results && analysis.analysis_results.length > 0
        ? analysis.analysis_results[analysis.analysis_results.length - 1]
        : null;

    return (
        <div className="analysis-view-container">
            <h2>Analysis for {document.filename}</h2>
            {!latestAnalysis ? (
                <div className="analysis-message">No analysis results found for this document.</div>
            ) : (
                <>
                    <h3>Summary</h3>
                    <p>{latestAnalysis.summary || 'N/A'}</p>

                    <h3>Key Information</h3>
                    <pre>{latestAnalysis.extracted_info ? JSON.stringify(latestAnalysis.extracted_info, null, 2) : 'N/A'}</pre>

                    <h3>Risk Assessment</h3>
                    <pre>{latestAnalysis.risks_identified ? JSON.stringify(latestAnalysis.risks_identified, null, 2) : 'N/A'}</pre>
                </>
            )}
        </div>
    );
};

export default AnalysisView;
