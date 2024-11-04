const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/authRoutes'); 
const userRoutes = require('./routes/user'); 
const productRoutes = require('./routes/product'); 
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((error) => console.error('MongoDB connection failed:', error.message));

// Define routes
app.use('/auth', authRoutes); 
app.use('/users', userRoutes); 
app.use('/api/products', productRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
