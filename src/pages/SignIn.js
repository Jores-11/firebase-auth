import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.config';
import InputField from '../components/InputField';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signInWithEmail = async () => {
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      if (!userCred.user.emailVerified) {
        setError('Please verify your email first.');
      } else {
        navigate('/welcome');
      }
    } catch (err) {
      setError(
        err.code === 'auth/invalid-credential'
          ? 'Incorrect email or password.'
          : err.code === 'auth/user-not-found'
          ? 'No account found with this email. Please sign up.'
          : 'Sign-in failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/welcome');
    } catch (err) {
      setError(
        err.code === 'auth/operation-not-allowed'
          ? 'Google sign-in is not enabled yet. Please use email/password or contact support.'
          : err.code === 'auth/popup-closed-by-user'
          ? 'Google sign-in was canceled.'
          : 'Google sign-in failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Sign In</h1>
        <InputField
          type="email"
          placeholder="Email"
          handleChange={(data) => setEmail(data)}
        />
        <InputField
          type="password"
          placeholder="Password"
          handleChange={(data) => setPassword(data)}
        />
        {error && <p className="auth-error">{error}</p>}
        <button
          className="auth-button"
          onClick={signInWithEmail}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign In'}
        </button>
        <div className="auth-divider">or</div>
        <div className="auth-google-logo-container" onClick={signInWithGoogle}>
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google Sign-In"
            className="auth-google-logo"
          />
        </div>
        <p className="auth-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="auth-link">
          No account? <Link to="/">Sign Up</Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;