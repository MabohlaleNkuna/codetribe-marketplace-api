const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust path as necessary

// Generate a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration set to 30 days
  });
};

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'admin' ? 'admin' : 'user'; // Default to 'user' if not 'admin'

    const user = new User({ username, email, password: hashedPassword, role: userRole });
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
      token: generateToken(user._id), // Generate a token on registration
    });
  } catch (error) {
    next(error); // Handle errors appropriately
  }
};

// Login a user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Log the user found and the provided password
    console.log('User found:', user);
    console.log('Provided password:', password);

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT token for the logged-in user
    const token = generateToken(user._id);
    res.json({
      token,
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
