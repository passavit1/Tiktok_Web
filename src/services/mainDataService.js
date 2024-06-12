import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const mainDataService = {
  getProfileWithProducts: (id) => axios.get(`${API_URL}/MainData/profileWithProducts/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
};

export default mainDataService;
