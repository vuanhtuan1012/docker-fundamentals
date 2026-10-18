/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-15 13:04:26
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-15 15:20:57
 */
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for users (for demonstration purposes)
const users = [];
let nextId = 1;


/**
 * Validates user data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
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
  res.json({ 'message': 'Welcome to the Users API!' });
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
app.get('/users/:id', (req, res) => {
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
app.put('/users/:id', validateUserData, (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const { name, email } = req.body;

  const user = users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ 'error': `User ${userId} not found!` });
  }

  // update the user's information
  user.name = name;
  user.email = email;

  res.json(user);
});


/**
 * Deletes a user by their ID
 * @param {number} userId - The ID of the user to delete
 * @returns {Object} The deleted user object
 */
app.delete('/users/:id', (req, res) => {
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
  console.log(`Users API is running on port ${port}`);
});