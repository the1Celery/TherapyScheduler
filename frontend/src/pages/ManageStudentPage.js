// src/pages/StudentsPage.js
import React, { useState, useEffect } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../services/studentService';
import '../styles/StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState({ name: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data);
    } catch (err) {
      setError('Error fetching students.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateStudent(currentStudent.student_id, currentStudent);
      } else {
        await createStudent(currentStudent);
      }
      setCurrentStudent({ name: '', email: '' });
      setIsEditing(false);
      fetchStudents();
    } catch (err) {
      setError('Error saving student.');
      console.error(err);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (err) {
        setError('Error deleting student.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="students-page">
      <div className="page-header">
        <h1>Student Management</h1>
        <p>Add and manage students for therapy appointments</p>
      </div>

      <div className="student-container">
        <div className="student-form-container">
          <form onSubmit={handleSubmit} className="student-form">
            <h2>{isEditing ? 'Edit Student' : 'Add New Student'}</h2>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={currentStudent.name}
                onChange={handleInputChange}
                required
                placeholder="Enter student name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={currentStudent.email}
                onChange={handleInputChange}
                required
                placeholder="Enter student email"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">
                {isEditing ? 'Update Student' : 'Add Student'}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setCurrentStudent({ name: '', email: '' });
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="student-list-container">
          <div className="student-list-header">
            <h2>Student List</h2>
          </div>
          {students.length === 0 ? (
            <p className="no-students">No students found. Add a new student to get started.</p>
          ) : (
            <div className="student-list">
              {students.map((student) => (
                <div key={student.student_id} className="student-card">
                  <div className="student-info">
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                    <p className="student-id">ID: {student.student_id}</p>
                  </div>
                  <div className="student-actions">
                    <button
                      onClick={() => handleEdit(student)}
                      className="btn-edit"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student.student_id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;