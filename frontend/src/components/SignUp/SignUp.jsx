import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUp.css";
import Axios from "axios";
import { motion } from "framer-motion";
import checkmark from "../Assets/checkmark.gif";

const pageTransitionVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpStatus, setSignUpStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const signUp = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setSignUpStatus("Please fill in all fields.");
      return;
    }
    Axios.post("http://localhost:3001/signUp", {
      fullName: fullName,
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setSignUpStatus(response.data.message);
      } else {
        setSignUpStatus("ACCOUNT CREATED SUCCESSFULLY!");
        setShowModal(true);
      }
    });
  };

  const closeModalAndRedirect = () => {
    setShowModal(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageTransitionVariants}
      transition={{ duration: 1.5 }}
    >
      <div className="body-2">
        <div className="signUp-container">
          <form className="signUp-form">
            <p className="sign-up-heading">Sign Up</p>
            <p className="paragraph">Sign up for an account</p>
            <div className="input-group">
              <input
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                required
                placeholder="Full Name"
                id="fullName"
                type="text"
              />
            </div>
            <div className="input-group">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="Email"
                id="email"
                type="text"
              />
            </div>
            <div className="input-group">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                placeholder="Password"
                name="password"
                id="password"
                type="password"
              />
            </div>
            <h1
              style={{
                color: "red",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {signUpStatus}
            </h1>
            <button type="submit" onClick={signUp}>
              Sign Up
            </button>
            <div className="bottom-text">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Successfully Registered!</h2>
            </div>
            <div className="modal-body">
              <img src={checkmark} alt="Checkmark" />
              <button onClick={closeModalAndRedirect}>Go to Login</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
