import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentPage() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
      <h2>Student Dashboard</h2>
      <p>Welcome to your student page.</p>
      <Link to="/">
        <button style={{ marginTop: 20 }}>Home</button>
      </Link>
    </div>
  );
}