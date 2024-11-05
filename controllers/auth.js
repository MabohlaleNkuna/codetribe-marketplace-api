const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = generateToken(user._id);
    res.json({ token, _id: user._id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
