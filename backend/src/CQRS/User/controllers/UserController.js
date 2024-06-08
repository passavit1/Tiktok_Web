const admin = require("firebase-admin");
const db = admin.firestore();

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userRef = db.collection("users").doc();
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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.collection("users").doc(id).update({ name, email });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("users").doc(id).delete();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDoc = await db.collection("users").doc(id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
};
