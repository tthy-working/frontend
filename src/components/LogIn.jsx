import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config.js';
import { useState } from "react";
import './LogIn.css';

export default function LogIn() {
  const [formData, setFormData] = useState({
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
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in:', userCredential.user);
      window.location.href = '/HomeUi';
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
    <div className="login-container">
      {/* Left Side - Branding */}
      <div className="login-branding">
        <div className="branding-shape shape-1"></div>
        <div className="branding-shape shape-2"></div>

        <div className="branding-content animate-fade-in">
          <div className="brand-logo">
            <i className="bi bi-mortarboard-fill me-3"></i>
            AcadFinder
          </div>
          <h1 className="brand-title">
            Research.<br />
            Simplified.
          </h1>
          <p className="brand-subtitle">
            Connect with professors, discover opportunities, and accelerate your academic journey with our AI-powered platform.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-container">
        <div className="login-form-wrapper animate-fade-in">
          <div className="form-header">
            <h2 className="form-title">Welcome Back</h2>
            <p className="form-subtitle">Please enter your details to sign in</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-group">
                <input
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  className="form-input"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <i className="bi bi-envelope form-input-icon"></i>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-group">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type="password"
                  className="form-input"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                <i className="bi bi-lock form-input-icon"></i>
              </div>
            </div>

            <div className="forgot-password">
              <a href="/forgot-password" className="link-text">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <i className="bi bi-arrow-right ms-2"></i>
                </>
              )}
            </button>

            <div className="divider-text">
              <span>OR CONTINUE WITH</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn-google"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              ) : (
                <i className="bi bi-google"></i>
              )}
              Google
            </button>

            <p className="signup-prompt">
              Don't have an account?{' '}
              <a href="/signup" className="link-text">Sign up for free</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}