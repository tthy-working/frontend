import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/homeUi">
                    <i className="bi bi-mortarboard-fill"></i> Professor Finder
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/homeUi' ? 'active' : ''}`}
                                to="/homeUi"
                            >
                                <i className="bi bi-house-door"></i> Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${location.pathname === '/ai-assistant' ? 'active' : ''}`}
                                to="/ai-assistant"
                            >
                                <i className="bi bi-robot"></i> AI Assistant
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
