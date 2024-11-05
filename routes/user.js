// routes/user.js
const express = require('express');
const userController = require('../controllers/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
