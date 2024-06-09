// src/services/userService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const userService = {
  getUserByUid: (uid) => axios.get(`${API_URL}/users/uid/${uid}`),
  getProfileById: (id) => axios.get(`${API_URL}/profiles/${id}`),
  createUser: (user) => axios.post(`${API_URL}/users`, user),
  updateUser: (id, user) => axios.put(`${API_URL}/users/${id}`, user),
  deleteUser: (id) => axios.delete(`${API_URL}/users/${id}`),
  updateProfile: (profileId, profile) =>
    axios.put(`${API_URL}/profiles/${profileId}`, profile),
};

export default userService;
