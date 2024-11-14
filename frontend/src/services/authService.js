// src/services/authService.js
import axios from '../api/axios';

const register = async (username, email, password) => {
  const response = await axios.post('/accounts/register/', {
    username,
    email,
    password,
  });
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post('/accounts/login/', {
    username,
    password,
  });
  return response.data;
};

export { register, login };