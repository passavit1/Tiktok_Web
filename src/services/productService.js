// src/services/productService.js
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

// const productService = {
//   addProducts: (payload) => axios.post(`${API_URL}/products`, payload),
//   getAllProducts: () => axios.get(`${API_URL}/products`),
//   updateProduct: (id, product) => axios.put(`${API_URL}/products/${id}`, product),
//   deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`),
// };

// export default productService;



// src/services/productService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const productService = {
  addProducts: (payload) => axios.post(`${API_URL}/products`, payload, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  getAllProducts: () => axios.get(`${API_URL}/products`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  updateProduct: (id, product) => axios.put(`${API_URL}/products/${id}`, product, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
  deleteProduct: (id) => axios.delete(`${API_URL}/products/${id}`, {
    headers: { 'ngrok-skip-browser-warning': 'true' },
  }),
};

export default productService;
