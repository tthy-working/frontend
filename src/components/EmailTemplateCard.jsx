import React from 'react';

const EmailTemplateCard = ({ title, body }) => {
    // Helper to parse subject and body
    const getMailtoLink = () => {
        let subject = "Research Inquiry";
        let cleanBody = body;

        // Check if body starts with "Subject:"
        const subjectMatch = body.match(/^Subject:\s*(.+?)(\n|$)/i);
        if (subjectMatch) {
            subject = subjectMatch[1].trim();
            // Remove the subject line from the body for the email content
            cleanBody = body.replace(/^Subject:.+(\n|$)/i, '').trim();
        }

        return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(cleanBody)}`;
    };

    return (
        <div className="card h-100 shadow-sm border-0" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)' }}>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-primary mb-3">
                    <i className="bi bi-envelope-paper me-2"></i>{title}
                </h5>
                <div className="card-text flex-grow-1 mb-4 text-muted custom-scrollbar" style={{
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.9rem',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    paddingRight: '5px'
                }}>
                    {body}
                </div>
                <a
                    href={getMailtoLink()}
                    className="btn btn-primary w-100 mt-auto"
                >
                    <i className="bi bi-send me-2"></i>Use Template
                </a>
            </div>
        </div>
    );
};

export default EmailTemplateCard;
