import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./homepage.css";

export const HomePage = () => {
  const wordVariants = {
    hidden: {
      opacity: 0,
      x: -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="homepage"
      >
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Cedarville+Cursive&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap')
        </style>
        <div className="home-content">
          <div className="main-content" style={{ textAlign: "left" }}>
            <div className="content-wrapper">
              <div className="font-family">
                <motion.span
                  className="line"
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ fontSize: "80px", color: "#ffffff" }}
                >
                  Welcome!
                </motion.span>
                <br />
                <br />
                <motion.span
                  className="line"
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ fontSize: "140px", color: "#ffee93" }}
                >
                  I'm JSMTheBarber
                </motion.span>
                <br />
                <br />
                <br />
                <motion.span
                  className="line"
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ fontSize: "50px", color: "#ffffff" }}
                >
                  A professional barber and stylist
                </motion.span>
                <br />
                <br />
                <br />
                <motion.span
                  className="line"
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                  style={{ fontSize: "40px", color: "#ffffff" }}
                >
                  Login to book an appointment today!
                </motion.span>
              </div>
              <Link to="/signup">
              <button class="btn-17">
                <span class="text-container">
                  <span class="text">Create An Account</span>
                </span>
              </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
