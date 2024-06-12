// src/services/userService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const userService = {
  getUserByUid: (uid) => axios.get(`${API_URL}/users/uid/${uid}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  createUser: (user) => axios.post(`${API_URL}/users`, user, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  updateUser: (id, user) => axios.put(`${API_URL}/users/${id}`, user, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
};

export default userService;
