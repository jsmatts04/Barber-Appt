import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./Homepage/homepage";
import { ScheduleAppt } from "./ScheduleAppt/ScheduleAppt";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import Navbar from "./Navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const pageTransitionVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

function RouterFunction() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} logout={handleLogout} />
        <AnimatePresence>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={{ duration: 2.0 }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/Login"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={{ duration: 2.0 }}
                >
                  <Login onLogin={handleLogin} />
                </motion.div>
              }
            />
            <Route
              path="/SignUp"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageTransitionVariants}
                  transition={{ duration: 2.0 }}
                >
                  <SignUp />
                </motion.div>
              }
            />
            {isLoggedIn && (
              <Route
                path="/ScheduleAppt"
                element={
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageTransitionVariants}
                    transition={{ duration: 0.5 }}
                  >
                    <ScheduleAppt />
                  </motion.div>
                }
              />
            )}
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  );
}

export default RouterFunction;