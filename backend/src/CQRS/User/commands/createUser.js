// createUser.js
const admin = require('firebase-admin');
const db = admin.firestore();

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userRef = db.collection('users').doc();
    await userRef.set({
      name,
      email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(201).json({ id: userRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
