const Product = require('../models/product');

const createProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = new Product({ name, description, price, userId: req.user.id });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ available: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const hideProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(id, { available: false }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct, hideProduct };
