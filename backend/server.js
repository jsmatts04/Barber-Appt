const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = 10;

const app = express();

app.use(express.json());
app.use(cors());

// Define the secret key at the global scope
const secretKey = "Jinky_Joompy_$*";

// Create MySQL connection
const con = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "barber-appt",
});

// Route for user sign up
app.post("/signUp", (req, res) => {
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    const fullName = req.body.fullName;
    const email = req.body.email;
    const hashedPassword = hash;

    con.query(
      "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        res.status(201).send(result);
      }
    );
  });
});

// Route for user login
app.post("/login", (req, res) => {
  const email = req.body.email;

  con.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, response) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
          }
          if (response) {
            // If response is true, generate JWT token
            const token = generateToken(result[0].id);
            res.status(200).json({ token });
          } else {
            res.status(401).json({ message: "Wrong email or password" });
          }
        }
      );
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  });
});

// Route for booking appointments
app.post("/ScheduleAppt", (req, res) => {
  const fullName = req.body.fullName;
  const date = req.body.date;
  const time = req.body.time;

  con.query(
    "INSERT INTO appointments (fullName, date, time) VALUES (?, ?, ?)",
    [fullName, date, time],
    (err, result) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).send("Appointment booked successfully!");
    }
  );
});

app.get("/getBookedTimes", (req, res) => {
  // Fetch booked times from the database
  con.query("SELECT time FROM appointments WHERE date = ?", [req.query.date], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    // Extract booked times from the result
    const bookedTimes = result.map(appointment => appointment.time);
    res.status(200).json(bookedTimes);
  });
});




// Function to generate JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: "24h" });
}

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
}

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
