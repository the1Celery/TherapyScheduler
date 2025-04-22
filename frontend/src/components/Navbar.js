import React from 'react';
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  //On logout, setIsLoggedIn -> false, redirect to login page
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

=======
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Therapy Scheduler
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
<<<<<<< HEAD
          {!isLoggedIn ? (
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          ) : (
            <li className="nav-item">
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
=======
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
        </ul>
      </div>
    </nav>
  );
};

<<<<<<< HEAD

=======
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
export default Navbar;