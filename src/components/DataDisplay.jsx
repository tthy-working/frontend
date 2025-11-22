import { useState, useEffect } from 'react';
import FavoriteButton from './FavoriteButton';
import './DataDisplay.css';

export default function DataDisplay({ searchQuery = '' }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://uvddanzqgxbmjzwgstau.supabase.co/storage/v1/object/public/new_datatest/professors_hierarchical_v2.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log('Fetched data:', jsonData);
                setData(jsonData.students || []);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteProfessors');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (error) {
                console.error('Error loading favorites:', error);
                setFavorites([]);
            }
        }
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
                const deptName = dept.department_name?.toLowerCase() || '';
                const schoolName = school.school_name?.toLowerCase() || '';
                const researchText = prof.recent_work?.map(w => (w.paper_title_year || '') + ' ' + (w.summary || '')).join(' ').toLowerCase() || '';

                return profName.includes(query) ||
                    profEmail.includes(query) ||
                    deptName.includes(query) ||
                    schoolName.includes(query) ||
                    researchText.includes(query);
            })
        })).filter(dept => dept.professors && dept.professors.length > 0)
    })).filter(school => school.departments && school.departments.length > 0);

    // Check if professor is favorited
    const isFavorited = (professorId) => {
        return favorites.some(fav => fav.id === professorId);
    };

    // Toggle favorite status
    const handleToggleFavorite = async (professor) => {
        const isFav = isFavorited(professor.id);

        if (isFav) {
            // Remove from favorites
            const updatedFavorites = favorites.filter(fav => fav.id !== professor.id);
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteProfessors', JSON.stringify(updatedFavorites));
        } else {
            // Add to favorites
            const updatedFavorites = [...favorites, professor];
            setFavorites(updatedFavorites);
            localStorage.setItem('favoriteProfessors', JSON.stringify(updatedFavorites));
        }
    };

    if (loading) return <div className="text-center p-4">Loading professor data...</div>;
    if (error) return <div className="alert alert-danger m-3">Error: {error}</div>;
    if (!data || data.length === 0) {
        return <div className="alert alert-warning m-3">No professor data found.</div>;
    }

    return (
        <div className="container-fluid p-3">
            <h4 className="mb-4"><strong>Professor Research Directory</strong></h4>

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
                                <i className="bi bi-building"></i><strong>{school.school_name}</strong>
                            </h5>

                            {school.departments?.map((dept, deptIdx) => {
                                return (
                                    <div key={deptIdx} className="ms-3 mb-4">
                                        <h6 className="text-secondary mb-3">
                                            <i className="bi bi-folder"></i> {dept.department_name}
                                        </h6>

                                        {dept.professors?.map((prof, profIdx) => {
                                            // Create professor object with unique ID for favoriting
                                            const professorObj = {
                                                id: `${school.school_name}-${dept.department_name}-${prof.name}`.replace(/\s+/g, '-'),
                                                name: prof.name,
                                                email: prof.email,
                                                department: dept.department_name,
                                                school: school.school_name,
                                                linkedin: prof.linkedin,
                                                google_scholar: prof.google_scholar,
                                                website: prof.website,
                                                recent_work: prof.recent_work
                                            };

                                            return (
                                                <div key={profIdx} className="card mb-3 shadow-sm">
                                                    <div className="card-body">
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <h5 className="card-title mb-0">
                                                                <i className="bi bi-person-circle"></i><strong>{prof.name}</strong>
                                                            </h5>
                                                            <FavoriteButton
                                                                professor={professorObj}
                                                                onToggleFavorite={handleToggleFavorite}
                                                                isFavorited={isFavorited(professorObj.id)}
                                                            />
                                                        </div>

                                                        <div className="mb-3">
                                                            {prof.email && (
                                                                <a href={`mailto:${prof.email}`} className="btn btn-sm gradient-border-btn me-2 mb-2">
                                                                    <i className="bi bi-envelope"></i> Email
                                                                </a>
                                                            )}
                                                            {prof.linkedin && (
                                                                <a href={prof.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm gradient-border-btn me-2 mb-2">
                                                                    <i className="bi bi-linkedin"></i> LinkedIn
                                                                </a>
                                                            )}
                                                            {prof.google_scholar && (
                                                                <a href={prof.google_scholar} target="_blank" rel="noopener noreferrer" className="btn btn-sm gradient-border-btn me-2 mb-2">
                                                                    <i className="bi bi-mortarboard"></i> Google Scholar
                                                                </a>
                                                            )}
                                                        </div>

                                                        {prof.recent_work && prof.recent_work.length > 0 && (
                                                            <div>
                                                                <h6 className="text-muted mb-2">
                                                                    <i className="bi bi-file-text"></i> Recent Research:
                                                                </h6>
                                                                {prof.recent_work.map((work, workIdx) => (
                                                                    <div key={workIdx} className="mb-3 p-3 bg-light rounded border">
                                                                        <div className="mb-2">
                                                                            {work.paper_link ? (
                                                                                <a href={work.paper_link} target="_blank" rel="noopener noreferrer" className="fw-bold text-decoration-none">
                                                                                    {work.paper_title_year || 'Research Paper'}
                                                                                </a>
                                                                            ) : (
                                                                                <strong style={{ color: '#3c6aa9' }}>{work.paper_title_year || 'Research Paper'}</strong>
                                                                            )}
                                                                        </div>
                                                                        {work.summary && (
                                                                            <p className="mb-0 text-muted small">
                                                                                {work.summary}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
