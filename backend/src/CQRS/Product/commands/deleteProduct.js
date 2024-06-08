// src/CQRS/Product/commands/deleteProduct.js

const admin = require('firebase-admin');
const db = admin.firestore();

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('products').doc(id).delete();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteProduct;
