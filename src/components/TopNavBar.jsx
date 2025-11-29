import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config.js';
import './TopNavBar.css';

export default function TopNavBar() {




  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg gradient-top-navbar position-fixed top-0" style={{ left: '80px', right: 0, zIndex: 999 }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-white" href="#">
            <i className="bi bi-mortarboard-fill me-2"></i>
            AcadFinder
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-1 me-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ cursor: 'pointer' }}>
                  <button onClick={handleLogout}> Sign Out </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}