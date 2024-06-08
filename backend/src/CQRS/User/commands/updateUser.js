// updateUser.js
const admin = require('firebase-admin');
const db = admin.firestore();

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.collection('users').doc(id).update({ name, email });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = updateUser;
