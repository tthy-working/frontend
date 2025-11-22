import { useState, useEffect } from 'react';

export default function DataDisplay({ searchQuery = '' }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://uvddanzqgxbmjzwgstau.supabase.co/storage/v1/object/public/json-files_1/professors_no_college_grouped.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData);
                setData(jsonData.student || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter data based on search query
    const filteredData = data.map(school => ({
        ...school,
        departments: school.departments?.map(dept => ({
            ...dept,
            professors: dept.professors?.filter(prof => {
                if (!searchQuery) return true;

                const query = searchQuery.toLowerCase();
                const profName = prof.name?.toLowerCase() || '';
                const profEmail = prof.email?.toLowerCase() || '';
                const deptName = dept.department?.toLowerCase() || '';
                const schoolName = school.school?.toLowerCase() || '';
                const researchText = prof.recent_work?.join(' ').toLowerCase() || '';

                return profName.includes(query) ||
                    profEmail.includes(query) ||
                    deptName.includes(query) ||
                    schoolName.includes(query) ||
                    researchText.includes(query);
            })
        })).filter(dept => dept.professors && dept.professors.length > 0)
    })).filter(school => school.departments && school.departments.length > 0);

    if (loading) return <div className="text-center p-4">Loading professor data...</div>;
    if (error) return <div className="alert alert-danger m-3">Error: {error}</div>;
    if (!data || data.length === 0) {
        return <div className="alert alert-warning m-3">No professor data found.</div>;
    }

    return (
        <div className="container-fluid p-3">
            <h4 className="mb-4">Professor Research Directory</h4>

            {filteredData.length === 0 ? (
                <div className="alert alert-info">
                    No results found for "{searchQuery}". Try a different search term.
                </div>
            ) : (
                <>
                    <p className="text-muted mb-3">
                        Showing {filteredData.reduce((acc, school) =>
                            acc + school.departments.reduce((deptAcc, dept) =>
                                deptAcc + dept.professors.length, 0), 0)} professor(s)
                        {searchQuery && ` matching "${searchQuery}"`}
                    </p>

                    {filteredData.map((school, schoolIdx) => (
                        <div key={schoolIdx} className="mb-5">
                            <h5 className="text-primary mb-3">
                                <i className="bi bi-building"></i> {school.school}
                            </h5>

                            {school.departments?.map((dept, deptIdx) => (
                                <div key={deptIdx} className="ms-3 mb-4">
                                    <h6 className="text-secondary mb-3">
                                        <i className="bi bi-folder"></i> {dept.department}
                                    </h6>

                                    {dept.professors?.map((prof, profIdx) => (
                                        <div key={profIdx} className="card mb-3 shadow-sm">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    <i className="bi bi-person-circle"></i> {prof.name}
                                                </h5>

                                                <div className="mb-3">
                                                    {prof.email && (
                                                        <a href={`mailto:${prof.email}`} className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                            <i className="bi bi-envelope"></i> Email
                                                        </a>
                                                    )}
                                                    {prof.linkedin && (
                                                        <a href={prof.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                            <i className="bi bi-linkedin"></i> LinkedIn
                                                        </a>
                                                    )}
                                                    {prof.google_scholar && (
                                                        <a href={prof.google_scholar} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                                                            <i className="bi bi-mortarboard"></i> Google Scholar
                                                        </a>
                                                    )}
                                                </div>

                                                {prof.recent_work && prof.recent_work.length > 0 && (
                                                    <div>
                                                        <h6 className="text-muted mb-2">
                                                            <i className="bi bi-file-text"></i> Recent Research:
                                                        </h6>
                                                        {prof.recent_work.map((work, workIdx) => {
                                                            // Extract title and year from the work string
                                                            // Format: "Title YYYY: Summary text"
                                                            const colonIndex = work.indexOf(':');
                                                            let title = 'Research Paper';
                                                            let year = '';
                                                            let summary = work;

                                                            if (colonIndex > 0) {
                                                                const titlePart = work.substring(0, colonIndex).trim();
                                                                summary = work.substring(colonIndex + 1).trim();

                                                                // Extract year from title (last 4 digits)
                                                                const yearMatch = titlePart.match(/(\d{4})\s*$/);
                                                                if (yearMatch) {
                                                                    year = yearMatch[1];
                                                                    title = titlePart.substring(0, titlePart.length - 5).trim();
                                                                } else {
                                                                    title = titlePart;
                                                                }
                                                            }

                                                            return (
                                                                <div key={workIdx} className="mb-3 p-3 bg-light rounded border">
                                                                    <div className="mb-2">
                                                                        <strong>{title}</strong>
                                                                        {year && <span className="badge bg-secondary ms-2">{year}</span>}
                                                                    </div>
                                                                    {summary && (
                                                                        <p className="mb-0 text-muted small">
                                                                            {summary}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
