// src/CQRS/Product/commands/uploadProductImage.js

const admin = require('firebase-admin');
const db = admin.firestore();
const bucket = admin.storage().bucket();

const uploadProductImage = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.body.userId;

    if (!file || !userId) {
      return res.status(400).json({ error: 'Image file and userId are required' });
    }

    const blob = bucket.file(`tiktok_meww/products/${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (err) => res.status(500).json({ error: err.message }));

    blobStream.on('finish', async () => {
      await blob.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      res.status(200).json({ url: publicUrl });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = uploadProductImage;
