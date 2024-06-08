const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const createUser = require('../commands/createUser');
const updateUser = require('../commands/updateUser');
const deleteUser = require('../commands/deleteUser');
const getUser = require('../queries/getUser');
const getUsers = require('../queries/getUsers');
const uploadProfileImage = require('../commands/uploadProfileImage');

// CRUD routes
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.get('/', getUsers);

// Route for uploading profile image
router.post('/upload-profile-image', upload.single('image'), uploadProfileImage);

module.exports = router;
