import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./ScheduleAppt.css";
import axios from "axios";
import emailjs from "emailjs-com"; // Import Email.js library
import checkmark from "../Assets/checkmark.gif";

export const ScheduleAppt = () => {
  const [fullName, setFullName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [bookedTimes, setBookedTimes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [availableTimes] = useState([
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM"
  ]);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const currentDate = new Date();
  const oneMonthLater = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );

  useEffect(() => {
    if (selectedDate) {
      axios
        .get("https://barber-appt.onrender.com/getBookedTimes", {
          params: {
            date: selectedDate,
          },
        })
        .then((response) => {
          setBookedTimes(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error, e.g., show error message to the user
        });
    }
  }, [selectedDate]);

  const isTimePassed = (time) => {
    const selectedDateTime = new Date(selectedDate + " " + time);
    const currentDateTime = new Date();
    currentDateTime.setSeconds(0);
    currentDateTime.setMilliseconds(0);
    return selectedDateTime <= currentDateTime;
  };

  const handleTimeSelection = (time) => {
    if (!bookedTimes.includes(time)) {
      setSelectedTime(time);
      setTimeError("");
    } else {
      setTimeError(
        "This time slot is already booked. Please select another time."
      );
    }
  };

  const handleScheduleAppointment = () => {
    let hasError = false;

    if (!fullName.trim()) {
      setFullNameError("Please enter your full name.");
      hasError = true;
    } else {
      setFullNameError("");
    }

    if (!selectedDate) {
      setDateError("Please select a date.");
      hasError = true;
    } else {
      setDateError("");
    }

    if (!selectedTime) {
      setTimeError("Please select a time.");
      hasError = true;
    } else {
      setTimeError("");
    }

    if (!hasError) {
      if (!formSubmitted) {
        axios
          .post("https://barber-appt.onrender.com/ScheduleAppt", {
            fullName: fullName,
            date: selectedDate,
            time: selectedTime,
          })
          .then((response) => {
            console.log(response.data);
            setFormSubmitted(true);
            setSuccessMessage("Appointment successfully scheduled!");
            setFullName("");
            setSelectedDate("");
            setSelectedTime("");
            // Refresh booked times
            setBookedTimes([...bookedTimes, selectedTime]);
            sendEmail(); // Call the function to send email after booking
            setModalVisible(true); // Show the modal
          })
          .catch((error) => {
            console.error(error);
            // Handle error, e.g., show error message to the user
          });
      }
    }
  };

  // Function to send email using Email.js
  const sendEmail = () => {
    // Use Email.js SDK to send email
    emailjs
      .send("service_kcjl9sl", "template_kl6j27m", {
        clientName: fullName, 
        appointmentDate: selectedDate, 
        appointmentTime: selectedTime, 
      }, "8G1sbA6KokAhfReWa")
      .then((response) => {
        console.log("Email sent successfully:", response);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
      });
  };

  // Function to close the modal and redirect to the homepage
  const closeModalAndRedirect = () => {
    setModalVisible(false);
    navigate("/"); // Redirect to the homepage
  };

  return (
    <div>
      <div className="S-container">
        <div className="appointment-container">
          <form id="appointment-form" className="appointment-form">
            <p className="sign-up-heading">Schedule Appointment</p>
            <p className="paragraph">Schedule an appointment today</p>
            <div className="input-group">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
              {fullNameError && (
                <div className="error-message">{fullNameError}</div>
              )}
            </div>
            <div className="input-group">
              <input
                required
                type="date"
                placeholder="Date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                min={currentDate.toISOString().split("T")[0]}
                max={oneMonthLater.toISOString().split("T")[0]}
              />
              {dateError && <div className="error-message">{dateError}</div>}
            </div>
            <div className="input-group">
              {availableTimes.map((time, index) => {
                // Check if the time slot is already booked
                const isBooked = bookedTimes.includes(time);
                // Check if the time slot has passed
                const isPassed = isTimePassed(time);
                // Disable the time slot if it's already booked or has passed
                const isDisabled = isBooked || isPassed;

                return (
                  <div
                    key={index}
                    onClick={() => handleTimeSelection(time)}
                    className={`time-button ${
                      selectedTime === time ? "selected" : ""
                    } ${isPassed ? "time-passed" : ""} ${
                      isBooked ? "time-booked" : ""
                    }`}
                    disabled={isDisabled}
                    style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                  >
                    {time}
                  </div>
                );
              })}
            </div>
            {timeError && <div className="error-message">{timeError}</div>}
            <button type="button" onClick={handleScheduleAppointment}>
              Schedule
            </button>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </form>
        </div>
      </div>
      {/* Modal for success message */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Appointment Successfully Scheduled!</h2>
            <img src={checkmark} alt="Checkmark" />
            <button onClick={closeModalAndRedirect}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
  );
};
