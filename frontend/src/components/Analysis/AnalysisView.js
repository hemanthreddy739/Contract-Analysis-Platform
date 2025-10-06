import React, { useState, useEffect } from 'react';
import './AnalysisView.css'; // Import the new CSS file

const renderJsonAsList = (data) => {
    if (typeof data === 'object' && data !== null) {
        return (
            <ul>
                {Object.entries(data).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {renderJsonAsList(value)}
                    </li>
                ))}
            </ul>
        );
    } else if (Array.isArray(data)) {
        return (
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{renderJsonAsList(item)}</li>
                ))}
            </ul>
        );
    } else {
        return String(data);
    }
};

const AnalysisView = ({ document }) => {
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('Summary'); // New state for active tab

    useEffect(() => {
        if (document && document.id) {
            const fetchAnalysis = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await fetch(`/api/documents/${document.id}/analyze`, {
                        method: 'POST',
                    });
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

    let keyInfoParsed = null;
    try {
        keyInfoParsed = analysis.key_information ? JSON.parse(analysis.key_information) : null;
    } catch (e) {
        console.error("Failed to parse key_information JSON:", e);
        keyInfoParsed = analysis.key_information; // Fallback to raw string if parsing fails
    }

    let riskAssessmentParsed = null;
    try {
        riskAssessmentParsed = analysis.risk_assessment ? JSON.parse(analysis.risk_assessment) : null;
    } catch (e) {
        console.error("Failed to parse risk_assessment JSON:", e);
        riskAssessmentParsed = analysis.risk_assessment; // Fallback to raw string if parsing fails
    }

    return (
        <div className="analysis-view-container">
            <h2>Analysis for {document.filename}</h2>
            {!analysis ? (
                <div className="analysis-message">No analysis results found for this document.</div>
            ) : (
                <>
                    <div className="tabs-nav">
                        <button
                            className={`tab-button ${activeTab === 'Summary' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Summary')}
                        >
                            Summary
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'Key Information' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Key Information')}
                        >
                            Key Information
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'Risk Assessment' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Risk Assessment')}
                        >
                            Risk Assessment
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'Summary' && (
                            <div className="summary-content">
                                <h3>Summary</h3>
                                <p>{analysis.summary || 'N/A'}</p>
                            </div>
                        )}
                        {activeTab === 'Key Information' && (
                            <div className="key-info-content">
                                <h3>Key Information</h3>
                                {keyInfoParsed ? renderJsonAsList(keyInfoParsed) : <p>N/A</p>}
                            </div>
                        )}
                        {activeTab === 'Risk Assessment' && (
                            <div className="risk-assessment-content">
                                <h3>Risk Assessment</h3>
                                {riskAssessmentParsed ? renderJsonAsList(riskAssessmentParsed) : <p>N/A</p>}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AnalysisView;
