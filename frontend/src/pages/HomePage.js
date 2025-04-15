import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Therapy Scheduler</h1>
        <p>Streamline your therapy appointments with our easy-to-use scheduling system</p>
        <Link to="/students" className="cta-button">
          Manage Students
        </Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Student Management</h3>
          <p>Easily add, update, and manage student information in one place.</p>
        </div>
        <div className="feature-card">
          <h3>Appointment Booking</h3>
          <p>Schedule therapy sessions with a simple and intuitive interface.</p>
        </div>
        <div className="feature-card">
          <h3>Availability Tracking</h3>
          <p>Track therapist availability to optimize scheduling.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;