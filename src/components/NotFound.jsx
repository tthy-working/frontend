import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

   
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDateTime = (date) => {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="notfound-page">
            
            <div className="notfound-info-bar">
                <div className="notfound-info-item">
                    <i className="fa-solid fa-clock me-2"></i>
                    <span>
                        <strong>UTC:</strong> {formatDateTime(currentTime)}
                    </span>
                </div>
                <div className="notfound-info-divider"></div>
                <div className="notfound-info-item">
                    <i className="fa-solid fa-user me-2"></i>
                    <span>
                        <strong>User:</strong> anfebladii
                    </span>
                </div>
            </div>

            
            <div className="notfound-background">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                    <div className="shape shape-5"></div>
                </div>
            </div>

           
            <div className="notfound-content">
                
                <div className="error-number">
                    <span className="digit digit-4-1">4</span>
                    <span className="digit digit-0">
                        <div className="zero-ring">
                            <div className="zero-inner"></div>
                        </div>
                    </span>
                    <span className="digit digit-4-2">4</span>
                </div>

               
                <div className="error-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-description">
                    Oops! The page you're looking for seems to have wandered off into the research archives.
                </p>

               
                <div className="error-actions">
                    <button 
                        className="btn-home"
                        onClick={() => navigate('/HomeUi')}
                    >
                        <i className="fa-solid fa-home me-2"></i>
                        Go Home
                    </button>
                    <button 
                        className="btn-back"
                        onClick={() => navigate(-1)}
                    >
                        <i className="fa-solid fa-arrow-left me-2"></i>
                        Go Back
                    </button>
                </div>

               
                <div className="suggestions">
                    <p className="suggestions-title">While you're here, you might want to:</p>
                    <div className="suggestions-grid">
                        <div className="suggestion-card" onClick={() => navigate('/HomeUi')}>
                            <i className="fa-solid fa-search"></i>
                            <span>Search Research</span>
                        </div>
                        <div className="suggestion-card" onClick={() => navigate('/AI-Assistant')}>
                            <i className="fa-solid fa-robot"></i>
                            <span>Ask AI Assistant</span>
                        </div>
                        <div className="suggestion-card" onClick={() => navigate('/Interview')}>
                            <i className="fa-solid fa-microphone"></i>
                            <span>Practice Interview</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}