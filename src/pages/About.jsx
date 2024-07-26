import React from 'react';
import './About.css';
import aboutImage from '../assets/about-2.png';

const About = () => {
  return (
    <div className="about-container" style={{ backgroundImage: `url(${aboutImage})` }}>
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
