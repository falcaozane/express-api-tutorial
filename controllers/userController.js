const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsersFromDB, saveUsersToDB, getUserByIdFromDB, updateUserInDB, deleteUserFromDB } = require('../models/userModel');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const users = getUsersFromDB();
    const userExists = users.find(user => user.username === username);
    if (userExists) return res.status(400).send('User already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = { id: users.length + 1, username, password: hashedPassword, email };
    users.push(newUser);
    saveUsersToDB(users);

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login and get JWT token
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const users = getUsersFromDB();
  const user = users.find(user => user.username === username);
  if (!user) return res.status(400).send('Invalid credentials');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid credentials');

  const token = generateToken({ id: user.id, username: user.username });
  res.json({ token });
};

// Get all users
exports.getUsers = (req, res) => {
  const users = getUsersFromDB();
  res.json(users.map(user => ({ id: user.id, username: user.username, email: user.email })));
};

// Get a single user by ID
exports.getUserById = (req, res) => {
  const user = getUserByIdFromDB(req.params.id);
  if (!user) return res.status(404).send('User not found');
  res.json({ id: user.id, username: user.username, email: user.email });
};

// Update a user
exports.updateUser = (req, res) => {
  const { username, email } = req.body;
  const updatedUser = updateUserInDB(req.params.id, { username, email });
  if (!updatedUser) return res.status(404).send('User not found');
  res.send('User updated successfully');
};

// Delete a user
exports.deleteUser = (req, res) => {
  const deleted = deleteUserFromDB(req.params.id);
  if (!deleted) return res.status(404).send('User not found');
  res.send('User deleted successfully');
};