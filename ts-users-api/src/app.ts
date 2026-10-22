/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-20 23:04:56
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-22 00:47:51
 */
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import type { User, UserDataRequest } from './models.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory storage for users
const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
];
let nextId = users.length + 1;


// Middleware functions
/**
 * Validate user ID
 */
function validateUserId(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): void {
  const userId = Number(req.params.id);
  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }
  next();
}


/**
 * Validate user data request
 */
function validateUserData(
  req: Request<{}, {}, UserDataRequest>,
  res: Response,
  next: NextFunction
): void {
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
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Welcome to the TypeScript Users API!' });
});


/**
 * Retrieve all users
 */
app.get('/users', (_req: Request, res: Response) => {
  res.json(users);
});


/**
 * Retrieve a user by ID
 */
app.get(
  '/users/:id',
  validateUserId,
  (req: Request<{ id: string }>, res: Response) => {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
      res.status(404).json({ error: `User ${userId} not found!` });
      return;
    }

    res.json(user);
  }
);


/**
 * Create a new user
 */
app.post(
  '/users',
  validateUserData,
  (req: Request<{}, {}, UserDataRequest>, res: Response) => {
    const { name, email } = req.body;
    const newUser: User = { id: nextId++, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  }
);


/**
 * Update an existing user
 */
app.put(
  '/users/:id',
  validateUserId,
  validateUserData,
  (req: Request<{ id: string }, {}, UserDataRequest>, res: Response) => {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
      res.status(404).json({ error: `User ${userId} not found!` });
      return;
    }

    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    res.json(user);
  }
);


/**
 * Delete a user
 */
app.delete(
  '/users/:id',
  validateUserId,
  (req: Request<{ id: string }>, res: Response) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      res.status(404).json({ error: `User ${userId} not found!` });
      return;
    }

    users.splice(userIndex, 1);
    res.json({ message: `User ${userId} deleted successfully!` });
  }
)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});