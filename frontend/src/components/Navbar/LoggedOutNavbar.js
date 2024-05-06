// LoggedOutNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./Navbar.css";

const LoggedOutNavbar = () => {
  return (
    <ul className="navbar">
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/">Home</Link>
      </motion.li>
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/signup">Sign Up</Link>
      </motion.li>
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/login">Login</Link>
      </motion.li>
    </ul>
  );
};

export default LoggedOutNavbar;
