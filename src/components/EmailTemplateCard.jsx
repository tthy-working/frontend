import React from 'react';

const EmailTemplateCard = ({ title, body }) => {
    
    const getMailtoLink = () => {
        let subject = "Research Inquiry";
        let cleanBody = body;

        
        const subjectMatch = body.match(/^Subject:\s*(.+?)(\n|$)/i);
        if (subjectMatch) {
            subject = subjectMatch[1].trim();
            
            cleanBody = body.replace(/^Subject:.+(\n|$)/i, '').trim();
        }

        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(cleanBody)}`;
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column">
                <h6 className="card-title mb-3">
                    <i className="bi bi-envelope-paper"></i> {title}
                </h6>
                <div className="card-text flex-grow-1 mb-3 p-3 bg-light rounded border custom-scrollbar" style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.85rem',
                    maxHeight: '250px',
                    overflowY: 'auto',
                    fontFamily: 'monospace'
                }}>
                    {body}
                </div>
                <a
                    href={getMailtoLink()}
                    className="btn btn-outline-primary w-100 mt-auto"
                >
                    <i className="bi bi-send"></i> Use Template
                </a>
            </div>
        </div>
    );
};

export default EmailTemplateCard;
