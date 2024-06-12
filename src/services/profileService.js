// src/services/profileService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const profileService = {
  getProfileById: (id) => axios.get(`${API_URL}/profiles/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  updateProfile: (id, profile) => axios.put(`${API_URL}/profiles/${id}`, profile, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  createProfile: (profile) => axios.post(`${API_URL}/profiles`, profile, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  deleteProfile: (id) => axios.delete(`${API_URL}/profiles/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
};

export default profileService;
