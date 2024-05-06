// LoggedInNavbar.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import "./Navbar.css";

const LoggedInNavbar = ({ handleLogout }) => {
  return (
    <ul className="navbar">
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/">Home</Link>
      </motion.li>
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/ScheduleAppt">Schedule</Link>
      </motion.li>
      <motion.li className="navbar-item" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to="/" onClick={handleLogout}>Logout</Link>
      </motion.li>
    </ul>
  );
};

export default LoggedInNavbar;
