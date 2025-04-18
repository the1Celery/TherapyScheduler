import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    role: 'student',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [pwError, setPwError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'password' || name === 'confirmPassword') {
      const { password, confirmPassword } = { ...form, [name]: value };
      setPwError(
        password && confirmPassword && password !== confirmPassword
          ? 'Passwords do not match'
          : ''
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (pwError) return;

    const { role, firstName, lastName, email, password } = form;
    let url, payload;

    const base = { first_name: firstName, last_name: lastName, email, password };
    if (role === 'therapist') {
      url = '/api/therapists';
      payload = {
        ...base,
        admin_id: 1,
        approval_date: new Date().toISOString().slice(0,10)
      };
    } else if (role === 'parent') {
      url = '/api/parents';
      payload = base;  // no studentId for now
    } else {
      url = '/api/students';
      payload = base;
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      navigate('/login');
    } else {
      const err = await res.json();
      alert('Error: ' + err.error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
          <option value="therapist">Tutor/Therapist</option>
        </select>

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {pwError && <p style={{ color: 'red', margin: '4px 0' }}>{pwError}</p>}

        <button type="submit" disabled={!!pwError}>
          Sign Up
        </button>
      </form>

      <div className="toggle-link">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}
