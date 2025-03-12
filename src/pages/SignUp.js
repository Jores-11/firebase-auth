import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase.config';
import InputField from '../components/InputField';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUpWithEmail = async () => {
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCred.user);
      setEmail('');
      setPassword('');
      navigate('/signin');
    } catch (err) {
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'This email is already registered. Please sign in.'
          : err.code === 'auth/invalid-email'
          ? 'Invalid email format.'
          : 'Signup failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const signUpWithGoogle = async () => {
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
        <h1 className="auth-title">Sign Up</h1>
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
          onClick={signUpWithEmail}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Sign Up'}
        </button>
        <div className="auth-divider">or</div>
        <div className="auth-google-logo-container" onClick={signUpWithGoogle}>
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google Sign-In"
            className="auth-google-logo"
          />
        </div>
        <p className="auth-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;