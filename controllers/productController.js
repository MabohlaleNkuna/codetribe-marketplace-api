// controllers/productController.js
const Product = require('../models/product');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageURL, availability, visibility } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageURL,
      availability,
      visibility,
    });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error adding product:", error); // Log the error to console
    res.status(500).json({ error: 'Failed to add product' });
  }
};
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ visibility: true }); // Only show visible products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageURL, availability, visibility } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageURL, availability, visibility },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Hide/Unhide a product
exports.toggleVisibility = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.visibility = !product.visibility;
    await product.save();
    res.json({ message: `Product visibility set to ${product.visibility}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle product visibility' });
  }
};
