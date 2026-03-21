import axios from 'axios';
const API = 'https://postgraduate-exam.onrender.com/api';

export const api = {
  addQuestion: (data) => axios.post(`${API}/questions`, data),
  getRandomQuestions: (params) => axios.get(`${API}/questions/random`, { params }),
  gradeAnswer: (data) => axios.post(`${API}/questions/grade`, data),
  getQuestions: () => axios.get(`${API}/questions`),
  deleteQuestion: (id) => axios.delete(`${API}/questions/${id}`),
  // 新增这个：
  updateQuestion: (id, data) => axios.put(`${API}/questions/${id}`, data)
};