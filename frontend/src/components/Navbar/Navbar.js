import React from "react";
import LoggedOutNavbar from "./LoggedOutNavbar";
import LoggedInNavbar from "./LoggedInNavbar";

const Navbar = ({ isLoggedIn, logout }) => {
  const handleLogout = () => {
    logout();
    window.location.href = "/"; // Redirect to the homepage
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