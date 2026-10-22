/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-20 23:04:56
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-21 22:16:24
 */
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
// Middleware to parse JSON request bodies
app.use(express.json());
// In-memory storage for users
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
 * Validate user existence
 */
function validateUserExistence(req, res, next) {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    next();
}
/**
 * Validate user data for creating a new user
 */
function validateUserData(req, res, next) {
    const { name, email } = req.body;
    if (!name || !email || name.trim() === '' || email.trim() === '') {
        res.status(400).json({ error: 'Name and email are required' });
        return;
    }
    next();
}
// endpoints
/**
 * Welcome endpoint
 */
app.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the TypeScript Users API!' });
});
/**
 * Retrieve all users
 */
app.get('/users', (_req, res) => {
    res.json(users);
});
/**
 * Retrieve a user by ID
 */
app.get('/users/:id', validateUserId, validateUserExistence, (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);
    res.json(user);
});
/**
 * Create a new user
 */
app.post('/users', validateUserData, (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});
/**
 * Update an existing user
 */
app.put('/users/:id', validateUserId, validateUserExistence, validateUserData, (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    const { name, email } = req.body;
    users[userIndex] = { id: userId, name, email };
    res.json(users[userIndex]);
});
/**
 * Delete a user
 */
app.delete('/users/:id', validateUserId, validateUserExistence, (req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    users.splice(userIndex, 1);
    res.json({ message: `User ${userId} deleted successfully!` });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
