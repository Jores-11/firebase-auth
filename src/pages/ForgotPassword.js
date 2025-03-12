import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase.config';
import InputField from '../components/InputField';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    if (!email) {
      setError('Please enter your email.');
      setLoading(false);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Reset link sent! Check your email.');
      setTimeout(() => navigate('/signin'), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <InputField
          type="email"
          placeholder="Email"
          handleChange={(data) => setEmail(data)}
        />
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
        <button
          className="auth-button"
          onClick={resetPassword}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p className="auth-link">
          Back to <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;