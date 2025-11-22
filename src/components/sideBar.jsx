import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="d-flex flex-column bg-dark text-white vh-100 p-2 position-fixed start-0 top-0" style={{ width: '80px' }}>
      {/* Logo or Brand */}
      <div className="text-center mb-3 pb-2 ">

      </div>

      {/* Navigation Items */}
      <nav className="nav flex-column gap-2">
        <button
          className={`btn text-white p-3 mb-2 mt-5 ${activeIcon === 'home' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('home', '/homeUi')}
          title="Home"
        >
          <i className="fa-solid fa-house fs-3"></i>
        </button>

        <button
          className={`btn text-white p-3 mb-2 mt-2 ${activeIcon === 'ai' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('ai', '/ai-assistant')}
          title="AI Assistant"
        >
          <i className="fa-solid fa-robot fs-3"></i>
        </button>

        <button
          className={`btn text-white p-3 mb-2 mt-2 ${activeIcon === 'interview' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('interview', '/interview')}
          title="Interview Practice"
        >
          <i className="fa-solid fa-microphone fs-3"></i>
        </button>

        <button
          className={`btn text-white p-3 mb-2 mt-2 ${activeIcon === 'dashboard' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('dashboard')}
          title="ai"

        >
          <i className="fa-brands fa-slack fs-3"></i>
        </button>

        <button
          className={`btn text-white p-3 mb-2 mt-1 ${activeIcon === 'profile' ? 'bg-secondary' : ''}`}
          onClick={() => handleIconClick('profile')}
          title="saved"
        >
          <i className="fa-solid fa-list fs-3"></i>

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