const admin = require('firebase-admin');
const db = admin.firestore();
const bucket = admin.storage().bucket();

const uploadProfileImage = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.body.userId;

    if (!file || !userId) {
      return res.status(400).json({ error: 'Image file and userId are required' });
    }

    const blob = bucket.file(`tiktok_meww/profile_pic/profile.jpg`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => res.status(500).json({ error: err.message }));

    blobStream.on('finish', async () => {
      // Make the file publicly accessible
      await blob.makePublic();

      // Get the public URL
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      // Save the URL in Firestore
      await db.collection('users').doc(userId).update({
        profileImageUrl: publicUrl,
      });

      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = uploadProfileImage;