import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { motion } from "framer-motion";

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

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginStatus("Please fill in all fields.");
      return;
    }
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setLoginStatus("LOGIN SUCCESSFUL");
          onLogin();
          navigate("/");
        } else {
          setLoginStatus(response.data.message || "Login Failed");
        }
      })
      .catch((error) => {
        console.error("Login error: ", error);
        setLoginStatus("Incorrect email or password");
      });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageTransitionVariants}
      transition={{ duration: 1.5 }}
    >
      <div className="login-container">
        <form className="login-form">
          <p className="heading">Login</p>
          <p className="paragraph">Login to your account</p>
          <div className="input-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              id="email"
              type="email"
            />
          </div>
          <div className="input-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
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
            {loginStatus}
          </h1>
          <button type="submit" onClick={login}>
            Login
          </button>
          <div className="bottom-text">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              <Link to="#">Forgot password?</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};