// src/services/authService.js
import axios from '../api/axios';

const register = async (username, email, password, first_name, last_name) => {
  const response = await axios.post('/accounts/register/', {
    username,
    email,
    password,
    first_name,
    last_name,
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

const logout = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post('/accounts/logout/', {}, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  // Clear local storage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return response.data;
};

export { register, login, logout };