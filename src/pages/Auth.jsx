// src/pages/Auth.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isSignUp) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User registered successfully!');
      } catch (error) {
        console.error('Error signing up:', error);
        alert('Error signing up. Please try again.');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('User logged in successfully!');
      } catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>{isSignUp ? 'Sign Up' : 'Login'}</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
      </button>
    </div>
  );
};

export default Auth;
