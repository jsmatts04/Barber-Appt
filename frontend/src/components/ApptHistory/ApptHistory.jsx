import React from 'react';
import './ApptHistory.css';

const ApptHistory = () => {
  // Sample data for demonstration purposes
  const appointments = [
    { date: '2023-05-01', time: '10:00 AM', status: 'Completed' },
    { date: '2023-05-05', time: '2:30 PM', status: 'Canceled' },
    { date: '2023-05-10', time: '4:00 PM', status: 'Upcoming' },
    // Add more appointment data as needed
  ];

  return (
    <div className="appt-history-container">
      <h2 className="section-title">Appointment History</h2>
      <table className="appt-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt, index) => (
            <tr key={index}>
              <td>{appt.date}</td>
              <td>{appt.time}</td>
              <td>
                <span
                  className={`status-badge ${
                    appt.status === 'Completed'
                      ? 'completed'
                      : appt.status === 'Canceled'
                      ? 'canceled'
                      : 'upcoming'
                  }`}
                >
                  {appt.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApptHistory;