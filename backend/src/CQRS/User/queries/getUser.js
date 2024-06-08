// getUser.js
const admin = require('firebase-admin');
const db = admin.firestore();

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection('users').doc(id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getUser;
