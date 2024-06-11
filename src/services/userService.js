// src/services/userService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const userService = {
  getUserByUid: (uid) => axios.get(`${API_URL}/users/uid/${uid}`),
  createUser: (user) => axios.post(`${API_URL}/users`, user),
  updateUser: (id, user) => axios.put(`${API_URL}/users/${id}`, user),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
};

export default userService;
