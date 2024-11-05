const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, hideProduct } = require('../controllers/product');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth); 

router.post('/', createProduct);
router.get('/', getProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/hide/:id', hideProduct);

module.exports = router;
