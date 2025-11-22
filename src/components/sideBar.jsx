import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './sideBar.css';

export default function SideBar() {
  const [activeIcon, setActiveIcon] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Update time every second
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

  const handleIconClick = (iconName, path) => {
    setActiveIcon(iconName);
    setIsSidebarOpen(false); // Close sidebar on mobile after clicking
    console.log(`${iconName} clicked`);
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    setIsSidebarOpen(false);
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Top Info Bar */}
      <div className="top-info-bar">
        {/* Hamburger Menu Button - Only visible on mobile */}
        <button 
          className="hamburger-btn d-lg-none"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          <i className={`fa-solid ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Info Items */}
        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center flex-grow-1">
          <div className="info-bar-item">
            <i className="fa-solid fa-clock"></i>
            <span className="info-text d-none d-md-inline">
              <strong>UTC:</strong> {formatDateTime(currentTime)}
            </span>
            <span className="info-text d-md-none">
              <strong>{formatDateTime(currentTime).split(' ')[1]}</strong>
            </span>
          </div>
          <div className="info-bar-divider d-none d-md-block"></div>
          <div className="info-bar-item">
            <i className="fa-solid fa-user"></i>
            <span className="info-text">
              <strong className="d-none d-md-inline">User:</strong> anfebladii
            </span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay d-lg-none" 
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`modern-sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo">
          <div className="logo-icon">
            <i className="fa-solid fa-flask"></i>
          </div>
          <span className="logo-text">Research</span>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <button
            className={`sidebar-btn ${activeIcon === 'home' ? 'active' : ''}`}
            onClick={() => handleIconClick('home', '/homeUi')}
            title="Home"
          >
            <i className="fa-solid fa-house"></i>
            <span className="btn-text">Home</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'ai' ? 'active' : ''}`}
            onClick={() => handleIconClick('ai', '/ai-assistant')}
            title="AI Assistant"
          >
            <i className="fa-solid fa-robot"></i>
            <span className="btn-text">AI Assistant</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'interview' ? 'active' : ''}`}
            onClick={() => handleIconClick('interview', '/interview')}
            title="Interview Practice"
          >
            <i className="fa-solid fa-microphone"></i>
            <span className="btn-text">Interview</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'favorites' ? 'active' : ''}`}
            onClick={() => handleIconClick('favorites', '/favorites')}
            title="Favorite Professors"
          >
            <i className="fa-solid fa-star"></i>
            <span className="btn-text">Favorites</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'email-templates' ? 'active' : ''}`}
            onClick={() => handleIconClick('email-templates', '/email-templates')}
            title="Email Templates"
          >
            <i className="fa-solid fa-envelope"></i>
            <span className="btn-text">Templates</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleIconClick('dashboard', '/dashboard')}
            title="Dashboard"
          >
            <i className="fa-brands fa-slack"></i>
            <span className="btn-text">Dashboard</span>
          </button>

          <button
            className={`sidebar-btn ${activeIcon === 'profile' ? 'active' : ''}`}
            onClick={() => handleIconClick('profile', '/profile')}
            title="Profile"
          >
            <i className="fa-solid fa-list"></i>
            <span className="btn-text">Profile</span>
          </button>
        </nav>

        {/* Logout at Bottom */}
        <div className="sidebar-footer">
          <button
            className="sidebar-btn logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span className="btn-text">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}