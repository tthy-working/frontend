import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config.js';
import { useState } from "react";
import './SignUp.css';

export default function SignUp(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      window.location.href = '/HomeUi';
      console.log('User created:', userCredential.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
      window.location.href = '/HomeUi';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background">
        <div className="floating-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>

      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-12 col-lg-10 col-xl-8">
            
            <div className="text-center mb-5 header-content fade-in-up">
              <h1 className="display-4 fw-bold mb-4 title-gradient">
                Find Research in Your Area
              </h1>
              <p className="lead subtitle-text">
                <span className="highlight-word">Easier.</span> 
                <span className="highlight-word">Faster.</span> 
                <span className="highlight-word">Smarter.</span>
              </p>
              <p className="description-text">Discover the latest research and connect with experts near you</p>
            </div>

            <div className="signup-card fade-in-up-delay">
              <div className="card-glow"></div>
              <h3 className="mb-4 text-center card-title">Create Your Account</h3>
              
              {error && (
                <div className="alert alert-custom alert-danger slide-down">
                  <i className="fa-solid fa-circle-exclamation me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4 input-wrapper">
                  <i className="fa-solid fa-user input-icon"></i>
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    type="text"
                    className="form-control custom-input"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-4 input-wrapper">
                  <i className="fa-solid fa-envelope input-icon"></i>
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    type="email"
                    className="form-control custom-input"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-4 input-wrapper">
                  <i className="fa-solid fa-lock input-icon"></i>
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    type="password"
                    className="form-control custom-input"
                    name="password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-custom-primary w-100 py-3 mb-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-user-plus me-2"></i>
                      Sign Up
                    </>
                  )}
                </button>

                <div className="divider">
                  <span>OR</span>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleGoogleSignIn} 
                  className="btn btn-custom-google w-100 py-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <i className="fa-brands fa-google me-2"></i>
                      Sign Up with Google
                    </>
                  )}
                </button>

                <p className="text-center footer-text mt-4 mb-0">
                  Already have an account? 
                  <a href="/login" className="login-link"> Log in</a>
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}