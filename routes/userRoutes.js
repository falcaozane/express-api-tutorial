const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes
router.get('/users', authenticateToken, getUsers);
router.get('/users/:id', authenticateToken, getUserById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);

module.exports = router;