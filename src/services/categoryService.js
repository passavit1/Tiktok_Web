// // src/services/categoryService.js
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// const categoryService = {
//   getCategories: () => axios.get(`${API_URL}/categories`),
//   addCategory: (category) => axios.post(`${API_URL}/categories`, category),
//   updateCategory: (id, category) => axios.put(`${API_URL}/categories/${id}`, category),
//   deleteCategory: (id) => axios.delete(`${API_URL}/categories/${id}`),
// };

// export default categoryService;



import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const categoryService = {
  getCategories: () =>
    axios.get(`${API_URL}/categories`, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }),
  addCategory: (category) =>
    axios.post(`${API_URL}/categories`, category, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }),
  updateCategory: (id, category) =>
    axios.put(`${API_URL}/categories/${id}`, category, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }),
  deleteCategory: (id) =>
    axios.delete(`${API_URL}/categories/${id}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }),
};

export default categoryService;
