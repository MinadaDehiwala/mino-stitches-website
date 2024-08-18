import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import './Navbar.css';
import logo from '../assets/brand-logo.png';
import { AuthContext } from "../context/AuthContextManager"

const Navbar = () => {
    const { authUser } = useContext(AuthContext);
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearchClick = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <AppBar position="absolute" className="navbar-blur" sx={{ boxShadow: 'none !important' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <img src={logo} alt="Mino Stitches" className="navbar-logo" />
                <nav className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
                    <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>Products</NavLink>
                    {authUser !== null &&
                        <>
                            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>Cart</NavLink>
                            <NavLink to="/my-orders" className={({ isActive }) => (isActive ? "active" : "")}>My Orders</NavLink>
                        </>}
                    <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active" : "")}>ChatBot</NavLink>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About Us</NavLink>
                    <NavLink to="/message" className={({ isActive }) => (isActive ? "active" : "")}>Contact Us</NavLink> {/* Added Contact Us */}
                    {authUser == null ?
                        (<NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>Login / Signup</NavLink>)
                        : <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>Profile</NavLink>}
                </nav>
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <IconButton onClick={handleSearchClick} sx={{ color: 'white' }}>
                        {searchOpen ? <CloseIcon /> : <SearchIcon />}
                    </IconButton>
                    {searchOpen && (
                        <Paper sx={{ position: 'absolute', top: '40px', right: 0, width: '200px', zIndex: 10 }}>
                            <InputBase
                                placeholder="Search..."
                                sx={{
                                    color: 'black',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    borderRadius: '4px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    width: '100%',
                                }}
                            />
                        </Paper>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
