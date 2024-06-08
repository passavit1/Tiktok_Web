// src/CQRS/Product/controllers/ProductController.js

const createProduct = require('../commands/createProduct');
const updateProduct = require('../commands/updateProduct');
const deleteProduct = require('../commands/deleteProduct');
const getProduct = require('../queries/getProduct');
const getProducts = require('../queries/getProducts');

const ProductController = {
  create: (req, res) => createProduct(req, res),
  update: (req, res) => updateProduct(req, res),
  delete: (req, res) => deleteProduct(req, res),
  getOne: (req, res) => getProduct(req, res),
  getAll: (req, res) => getProducts(req, res),
};

module.exports = ProductController;
