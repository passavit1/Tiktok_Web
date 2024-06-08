// src/CQRS/Product/queries/getProduct.js

const admin = require('firebase-admin');
const db = admin.firestore();

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productDoc = await db.collection('products').doc(id).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProduct;
