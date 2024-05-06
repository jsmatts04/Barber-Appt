import React from "react";
import {useNavigate } from "react-router-dom";
import "./Navbar.css";
import LoggedOutNavbar from "./LoggedOutNavbar";
import LoggedInNavbar from "./LoggedInNavbar";

const Navbar = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    logout();
    console.log("Navigating to homepage...");
    navigate("/", { replace: true });
  };

  return (
    <nav>
      {isLoggedIn ? (
        <LoggedInNavbar handleLogout={handleLogout} />
      ) : (
        <LoggedOutNavbar />
      )}
    </nav>
  );
};

export default Navbar;
