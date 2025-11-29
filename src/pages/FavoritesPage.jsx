import { useState } from 'react';
import SideBar from '../components/sideBar';
import TopNavBar from '../components/TopNavBar';
import ProfessorCard from '../components/ProfessorCard';
export default function FavoritesPage() {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteProfessors');
        if (savedFavorites) {
            try {
                return JSON.parse(savedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
                return [];
            }
        }
        return [];
    });

    return (
        <>
            <SideBar />
            <TopNavBar />
            <div className="container-fluid p-4">
                <div className="row justify-content-center mt-5">
                    <div className="mt-5"></div>
                    <div className="col-12 col-lg-10 col-xl-8 mt-5">
                        <div className="mb-4 d-flex justify-content-between align-items-end">
                            <div>
                                <h2>
                                    <i className="fa-solid fa-star text-warning"></i> Favorite Professors
                                </h2>
                                <p className="text-muted mb-0">
                                    Your saved professors for quick access
                                </p>
                            </div>
                            {favorites.length > 0 && (
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => {
                                        if (window.confirm('Are you sure you want to remove all favorites?')) {
                                            setFavorites([]);
                                            localStorage.removeItem('favoriteProfessors');
                                        }
                                    }}
                                >
                                    <i className="fa-solid fa-trash me-2"></i>
                                    Clear All
                                </button>
                            )}
                        </div>

                        {favorites && favorites.length > 0 ? (
                            <div className="row">
                                {favorites.map((professor) => (
                                    <div key={professor.id} className="col-12 col-md-6 mb-3">
                                        <ProfessorCard
                                            professor={professor}
                                            favorites={favorites}
                                            setFavorites={setFavorites}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="card shadow-sm text-center p-5">
                                <div className="card-body">
                                    <i className="fa-solid fa-star fs-1 text-muted mb-3"></i>
                                    <h4>No Favorite Professors Yet</h4>
                                    <p className="text-muted mb-4">
                                        Start adding professors to your favorites and they will appear here
                                    </p>
                                    <a href="/homeUi" className="btn btn-primary">
                                        <i className="bi bi-search me-2"></i>
                                        Browse Professors
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </>
    );
}
