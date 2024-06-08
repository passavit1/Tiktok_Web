// src/CQRS/Product/commands/createProduct.js

const admin = require('firebase-admin');
const db = admin.firestore();
const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    const { products, userId } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid payload: products should be an array' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'Invalid payload: userId is required' });
    }

    const batch = db.batch();
    products.forEach(product => {
      const productData = new Product({ userId, ...product });
      const productPlainObject = {
        userId: productData.userId,
        image: productData.image,
        title: productData.title,
        url: productData.url,
      };
      const productRef = db.collection('products').doc();
      batch.set(productRef, productPlainObject);
    });

    await batch.commit();
    res.status(201).json({ message: 'Products created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProduct;
