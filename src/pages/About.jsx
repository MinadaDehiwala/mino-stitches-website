// src/pages/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './About.css';
import aboutImage from '../assets/about-2.png';
import Navbar from '../components/Navbar.jsx';

const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundImage: `url(${aboutImage})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          zIndex: 0 
        }} 
      />
      <div className="about-content">
        <h1>Who We Are</h1>
        <p>
          We are a dedicated team passionate about embroidery and creating beautiful, customized products for our customers. Our mission is to provide high-quality embroidery services that bring your visions to life, whether for personal use or for your business needs.
        </p>
        <p>
          At Mino Stitches, we believe in the power of creativity and the joy it brings to both the creator and the recipient. Our experienced team uses the latest technology and techniques to ensure every piece we create meets the highest standards of quality and craftsmanship.
        </p>
        <hr className="separator" />
        <h1>Helping Hungry Dogs</h1>
        <p>
          We are proud to support our community by donating 40% of our profits to help feed hungry dogs. By choosing our products, you are not only getting high-quality embroidery but also contributing to a noble cause.
        </p>
        <a href="/products" className="cta-button">Shop Now</a>
      </div>
    </div>
  );
}

export default About;