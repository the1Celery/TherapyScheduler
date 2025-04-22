import apiClient from './api';

export const getStudents = () => {
  return apiClient.get('/students');
};

export const getStudent = (id) => {
  return apiClient.get(`/students/${id}`);
};

export const createStudent = (studentData) => {
  return apiClient.post('/students', studentData);
};

export const updateStudent = (id, studentData) => {
  return apiClient.put(`/students/${id}`, studentData);
};

export const deleteStudent = (id) => {
  return apiClient.delete(`/students/${id}`);
};