// routes/product.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth'); 
const productController = require('../controllers/productController');

// Public routes
router.get('/', productController.getAllProducts);            // Get all products
router.get('/:id', productController.getProductById);         // Get product by ID

// Protected routes
router.post('/add', authenticate, productController.addProduct); // Add a product
router.put('/update/:id', authenticate, productController.updateProduct); // Update a product
router.delete('/delete/:id', authenticate, productController.deleteProduct); // Delete a product
router.patch('/toggle-visibility/:id', authenticate, productController.toggleVisibility); // Hide/unhide a product

module.exports = router;
