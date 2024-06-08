// src/CQRS/Product/queries/getProducts.js

const admin = require('firebase-admin');
const db = admin.firestore();

const getProducts = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: 'userId query parameter is required' });
    }

    const productsRef = db.collection('products');
    const snapshot = await productsRef.where('userId', '==', userId).get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No products found' });
    }

    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
