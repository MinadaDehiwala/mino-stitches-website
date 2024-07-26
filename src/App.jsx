import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';
import MyOrders from './pages/MyOrders.jsx';
import ChatBot from './pages/ChatBot.jsx';
import About from './pages/About.jsx';
import Auth from './pages/Auth.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <div className="navbar">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>Cart</NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink>
        <NavLink to="/my-orders" className={({ isActive }) => (isActive ? "active" : "")}>My Orders</NavLink>
        <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>ChatBot</NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About Us</NavLink>
        <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login</NavLink>
        <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>Sign Up</NavLink>
        <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>Admin Dashboard</NavLink>
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
