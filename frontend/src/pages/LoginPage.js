import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPage.css';

<<<<<<< HEAD
export default function LoginPage({ setIsLoggedIn }) {
=======
export default function LoginPage() {
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: 'student',
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
<<<<<<< HEAD
    //If successful login
    if (res.ok) {
      const data = await res.json();

      //Save login status to local storage
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);

=======
    if (res.ok) {
      const data = await res.json();
>>>>>>> 1b2ae34fee5b08afc2e7cb18623febc52564f91a
      // Redirect to the user's dashboard based on role
      navigate(`/${data.role}`);
    } else {
      const err = await res.json();
      alert('Login failed: ' + err.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="therapist">Tutor/Therapist</option>
        </select>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Log In</button>
      </form>

      <div className="toggle-link">
        New here? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}
