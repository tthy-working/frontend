import React, { useState, useEffect } from 'react';
import EmailTemplateCard from '../components/EmailTemplateCard';
import TopNavBar from '../components/TopNavBar';
import SideBar from '../components/sideBar';

const EmailTemplatesPage = () => {
    const [templates, setTemplates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await fetch('https://uvddanzqgxbmjzwgstau.supabase.co/storage/v1/object/public/new_datatest/research_email_templates_clean.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch templates');
                }
                const data = await response.json();
                setTemplates(data);
            } catch (err) {
                console.error('Error fetching templates:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
                <TopNavBar />
                <div className="container-fluid p-4">
                    <h2 className="mb-4 text-light">
                        <i className="bi bi-envelope-open me-2"></i>Email Templates
                    </h2>
                    <p className="text-muted mb-5">
                        Use these templates to reach out to professors for research opportunities.
                        Click "Use Template" to open your default email client with the content pre-filled.
                    </p>

                    {loading && <div className="text-center text-light">Loading templates...</div>}
                    {error && <div className="alert alert-danger">Error: {error}</div>}

                    <div className="row g-4">
                        {!loading && !error && Object.entries(templates).map(([key, content], index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <EmailTemplateCard
                                    title={key.replace(/([A-Z])/g, ' $1').trim()} // Add space before capital letters
                                    body={content}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplatesPage;
