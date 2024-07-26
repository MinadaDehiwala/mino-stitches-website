// src/pages/Home.jsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import './Home.css';
import homeImage from '../assets/home-1.png';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <img src={homeImage} alt="Embroidery" className="hero-image" />
        <div className="hero-text">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Mino Stitches
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Your one-stop shop for all things embroidery!
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: 'white', color: 'black' }} size="large">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
