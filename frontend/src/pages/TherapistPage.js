import React from 'react';
import { Link } from 'react-router-dom';

export default function TherapistPage() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', textAlign: 'center' }}>
      <h2>Therapist Dashboard</h2>
      <p>Welcome to your therapist page.</p>
      <Link to="/">
        <button style={{ marginTop: 20 }}>Home</button>
      </Link>
    </div>
  );
}