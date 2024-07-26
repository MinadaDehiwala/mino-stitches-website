// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography } from '@mui/material';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box className="auth-container">
      <Typography variant="h4">{isLogin ? 'Login' : 'Sign Up'}</Typography>
      <form>
        {!isLogin && (
          <>
            <TextField label="First Name" variant="outlined" fullWidth margin="normal" />
            <TextField label="Last Name" variant="outlined" fullWidth margin="normal" />
          </>
        )}
        <TextField label="Email" variant="outlined" fullWidth margin="normal" />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
        {!isLogin && <TextField label="Confirm Password" type="password" variant="outlined" fullWidth margin="normal" />}
        <Button variant="contained" color="primary" fullWidth>{isLogin ? 'Login' : 'Sign Up'}</Button>
      </form>
      <Typography variant="body1" className="toggle-mode" onClick={toggleMode}>
        {isLogin ? 'No account? Sign up here' : 'Already have an account? Login here'}
      </Typography>
    </Box>
  );
};

export default Auth;
