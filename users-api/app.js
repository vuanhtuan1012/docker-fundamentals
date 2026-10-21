/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-15 13:04:26
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-22 00:51:38
 */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for users (for demonstration purposes)
const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];
let nextId = users.length + 1;


// Middleware functions
/**
 * Validate user ID
 */
function validateUserId(req, res, next) {
  const userId = Number(req.params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  next();
}


/**
 * Validates user data request
 */
function validateUserData(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email || name.trim() === '' || email.trim() === '') {
    return res.status(400).json({ 'error': 'Name and email are required!' });
  }
  next();
}


/**
 * Retrieves the welcome message
 * @returns {Object} The welcome message
 */
app.get('/', (_req, res) => {
  res.json({ 'message': 'Welcome to the Node.js Users API!' });
});


/**
 * Retrieves all users
 * @returns {Array} The list of users
 */
app.get('/users', (_req, res) => {
  res.json(users);
});


/**
 * Retrieves a user by their ID
 * @param {number} userId - The ID of the user to retrieve
 * @returns {Object} The user object
 */
app.get('/users/:id', validateUserId, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ 'error': `User ${userId} not found!` });
  }

  res.json(user);
});


/**
 * Creates a new user
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @returns {Object} The created user object
 */
app.post('/users', validateUserData, (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});


/**
 * Updates a user's information by their ID
 * @param {number} userId - The ID of the user to update
 * @param {string} name - The new name of the user
 * @param {string} email - The new email of the user
 * @returns {Object} The updated user object
 */
app.put('/users/:id', validateUserId, validateUserData, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ 'error': `User ${userId} not found!` });
  }

  // update the user's information
  const { name, email } = req.body;
  user.name = name;
  user.email = email;
  res.json(user);
});


/**
 * Deletes a user by their ID
 * @param {number} userId - The ID of the user to delete
 * @returns {Object} The deleted user object
 */
app.delete('/users/:id', validateUserId, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ 'error': `User ${userId} not found!` });
  }

  users.splice(userIndex, 1);
  res.json({ 'message': `User ${userId} deleted successfully!` });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});