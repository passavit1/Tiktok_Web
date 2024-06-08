// src/CQRS/Product/commands/updateProduct.js

const admin = require('firebase-admin');
const db = admin.firestore();
const Product = require('../models/Product');

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = new Product(req.body);
    await db.collection('products').doc(id).update(productData);
    res.status(200).json({ id, ...productData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateProduct;
