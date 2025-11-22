import FavoriteButton from './FavoriteButton';

export default function ProfessorCard({ professor, favorites, setFavorites }) {

    const isFavorited = favorites.some(fav => fav.id === professor.id);

    const handleToggleFavorite = async (prof) => {
        if (isFavorited) {

            setFavorites(favorites.filter(fav => fav.id !== prof.id));


            const updatedFavorites = favorites.filter(fav => fav.id !== prof.id);
            localStorage.setItem('favoriteProfessors', JSON.stringify(updatedFavorites));
        } else {

            const updatedFavorites = [...favorites, prof];
            setFavorites(updatedFavorites);


            localStorage.setItem('favoriteProfessors', JSON.stringify(updatedFavorites));
        }
    };

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="card-title mb-0">
                        <i className="bi bi-person-circle"></i> {professor.name}
                    </h6>
                    <FavoriteButton
                        professor={professor}
                        onToggleFavorite={handleToggleFavorite}
                        isFavorited={isFavorited}
                    />
                </div>


                <p className="text-muted small mb-2">
                    <i className="bi bi-building"></i> {professor.school}
                </p>
                <p className="text-muted small mb-3">
                    <i className="bi bi-folder"></i> {professor.department}
                </p>


                <div className="mb-3">
                    {professor.email && (
                        <a href={`mailto:${professor.email}`} className="btn btn-sm btn-outline-primary me-2 mb-2">
                            <i className="bi bi-envelope me-1"></i> Email
                        </a>
                    )}
                    {professor.linkedin && (
                        <a href={professor.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                            <i className="bi bi-linkedin me-1"></i> LinkedIn
                        </a>
                    )}
                    {professor.google_scholar && (
                        <a href={professor.google_scholar} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                            <i className="bi bi-mortarboard me-1"></i> Scholar
                        </a>
                    )}
                    {professor.website && (
                        <a href={professor.website} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary me-2 mb-2">
                            <i className="bi bi-globe me-1"></i> Website
                        </a>
                    )}
                </div>


                {professor.recent_work && professor.recent_work.length > 0 && (
                    <div>
                        <h6 className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                            <i className="bi bi-file-text"></i> Recent Research:
                        </h6>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            {professor.recent_work.map((work, workIdx) => (
                                <div key={workIdx} className="mb-2 p-2 bg-light rounded border" style={{ fontSize: '0.8rem' }}>
                                    <div className="mb-1">
                                        {work.paper_link ? (
                                            <a href={work.paper_link} target="_blank" rel="noopener noreferrer" className="fw-bold text-decoration-none" style={{ fontSize: '0.8rem' }}>
                                                {work.paper_title_year || 'Research Paper'}
                                            </a>
                                        ) : (
                                            <strong style={{ fontSize: '0.8rem' }}>{work.paper_title_year || 'Research Paper'}</strong>
                                        )}
                                    </div>
                                    {work.summary && (
                                        <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                                            {work.summary}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
