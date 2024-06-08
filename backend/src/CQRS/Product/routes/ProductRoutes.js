// src/CQRS/Product/routes/ProductRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const ProductController = require('../controllers/ProductController');
const uploadProductImage = require('../commands/uploadProductImage');

// CRUD routes for Product
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.get('/:id', ProductController.getOne);
router.get('/', ProductController.getAll);

// Route for uploading product image
router.post('/upload-image', upload.single('image'), uploadProductImage);

module.exports = router;
