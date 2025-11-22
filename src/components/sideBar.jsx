import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sideBar.css'; 

export default function SideBar() {
  const [activeIcon, setActiveIcon] = useState('');
  const navigate = useNavigate();

  const handleIconClick = (iconName, path) => {
    setActiveIcon(iconName);
    console.log(`${iconName} clicked`);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="gradient-border-sidebar d-flex flex-column">
      {/* Logo or Brand */}
      <div className="text-center mb-3 pb-2 ">

      </div>

      {/* Navigation Items */}
      <nav className="nav flex-column gap-2">
        <button
          className={`btn ${activeIcon === 'home' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('home', '/homeUi')}
          title="Home"
        >
          <i className="fa-solid fa-house fs-3 icon-home"></i>
        </button>

        <button
          className={`btn ${activeIcon === 'ai' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('ai', '/ai-assistant')}
          title="AI Assistant"
        >
          <i className="fa-solid fa-robot fs-3 icon-ai"></i>
        </button>

        <button
          className={`btn ${activeIcon === 'interview' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('interview', '/interview')}
          title="Interview Practice"
        >
          <i className="fa-solid fa-microphone fs-3 icon-interview"></i>
        </button>

        <button
          className={`btn ${activeIcon === 'favorites' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('favorites', '/favorites')}
          title="Favorite Professors"
        >
          <i className="fa-solid fa-star fs-3 icon-favorites"></i>
        </button>

        <button
          className={`btn ${activeIcon === 'dashboard' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('dashboard')}
          title="Dashboard"

        >
          <i className="fa-brands fa-slack fs-3 icon-dashboard"></i>
        </button>

        <button
          className={`btn ${activeIcon === 'profile' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('profile')}
          title="Profile"
        >
          <i className="fa-solid fa-list fs-3 icon-profile"></i>

        </button>

      </nav>

      {/* Logout at Bottom */}
      <div className="mt-auto">
        <button
          className={`btn text-white p-2 w-100 ${activeIcon === 'logout' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('logout')}
          title="Logout"
        >
          🚪
        </button>
      </div>
    </div>
  );
}