import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase.config';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-container">
        <h1 className="auth-title">Welcome</h1>
        <p className="auth-success">You’re successfully signed in!</p>
        <button className="auth-button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Welcome;