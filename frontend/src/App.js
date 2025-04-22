import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentPage from './pages/StudentPage';
import ParentPage from './pages/ParentPage';
import TherapistPage from './pages/TherapistPage';
import './styles/App.css';

function App() {
<<<<<<< HEAD

  //Initialize state isLoggedIn to false using the function setIsLoggedIn 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    //Check localStorage to determine boolean login status isLoggedIn
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentsPage />} />
=======
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/login" element={<LoginPage />} />
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/therapist" element={<TherapistPage />} />
<<<<<<< HEAD
        {/* Pass setIsLoggedIn down to LoginPage */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
=======
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
      </Routes>
    </Router>
  );
}

export default App;