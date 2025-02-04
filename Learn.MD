
# Learn.MD: Understanding the Codebase

This document provides a beginner-friendly explanation of each file and the code inside it. It will help you understand how the application works, step-by-step.

---

## Table of Contents

1. [`.env`](#env)
2. [`index.js`](#indexjs)
3. [`controllers/userController.js`](#controllersusercontrollerjs)
4. [`routes/userRoutes.js`](#routesuserroutesjs)
5. [`middleware/authMiddleware.js`](#middlewareauthmiddlewarejs)
6. [`models/userModel.js`](#modelsusermodeljs)
7. [`utils/jwtUtils.js`](#utilsjwtutilsjs)
8. [`data/users.json`](#datausersjson)

---

### `.env`

The `.env` file is used to store **environment variables**, which are configuration settings that can change depending on the environment (e.g., development, production).

- **Example Content**:
  ```env
  PORT=3000
  JWT_SECRET=your_jwt_secret_key
  ```

- **Explanation**:
  - `PORT`: The port number where your server will run. You can change this if needed.
  - `JWT_SECRET`: A secret key used to sign and verify JSON Web Tokens (JWT). This should be kept secure and not shared publicly.

---

### `index.js`

This is the **main entry point** of the application. It initializes the Express server, sets up middleware, and registers routes.

#### Key Sections:

```javascript
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Load environment variables from .env
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api', userRoutes); // Register user-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

- **Explanation**:
  - `dotenv.config()`: Loads environment variables from the `.env` file.
  - `express.json()`: Middleware to parse incoming JSON data.
  - `app.use('/api', userRoutes)`: Registers all user-related routes under the `/api` prefix.
  - `app.listen(PORT, ...)`: Starts the server on the specified port.

---

### `controllers/userController.js`

This file contains the **business logic** for handling user-related requests (e.g., registration, login, CRUD operations).

#### Key Functions:

1. **Register a New User**:
   ```javascript
   exports.registerUser = async (req, res) => {
     try {
       const { username, password, email } = req.body;

       const users = getUsersFromDB();
       const userExists = users.find(user => user.username === username);
       if (userExists) return res.status(400).send('User already exists');

       const hashedPassword = await bcrypt.hash(password, 10);

       const newUser = { id: users.length + 1, username, password: hashedPassword, email };
       users.push(newUser);
       saveUsersToDB(users);

       res.status(201).send('User registered successfully');
     } catch (error) {
       res.status(500).send('Server error');
     }
   };
   ```

   - **Explanation**:
     - Checks if the user already exists.
     - Hashes the password using `bcrypt`.
     - Saves the new user to the mock database (`users.json`).

2. **Login and Get JWT Token**:
   ```javascript
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
   ```

   - **Explanation**:
     - Finds the user by username.
     - Verifies the password using `bcrypt`.
     - Generates a JWT token if the credentials are valid.

3. **Get All Users**:
   ```javascript
   exports.getUsers = (req, res) => {
     const users = getUsersFromDB();
     res.json(users.map(user => ({ id: user.id, username: user.username, email: user.email })));
   };
   ```

   - **Explanation**:
     - Retrieves all users from the mock database.
     - Returns only the `id`, `username`, and `email` (excluding passwords).

4. **Update and Delete User**:
   - Similar logic applies for updating and deleting users, interacting with the mock database.

---

### `routes/userRoutes.js`

This file defines the **API routes** and maps them to the corresponding controller functions.

#### Example Route:

```javascript
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
```

- **Explanation**:
  - `/register` and `/login` are public routes (no authentication required).
  - `/users`, `/users/:id`, etc., are protected routes that require JWT authentication via `authenticateToken`.

---

### `middleware/authMiddleware.js`

This file contains the **JWT authentication middleware** that verifies tokens for protected routes.

#### Key Function:

```javascript
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
```

- **Explanation**:
  - Extracts the JWT token from the `Authorization` header.
  - Verifies the token using the `JWT_SECRET`.
  - If valid, attaches the user information to the request (`req.user`) and proceeds to the next middleware/route handler.

---

### `models/userModel.js`

This file handles interactions with the **mock database** (`users.json`).

#### Key Functions:

1. **Read Users from Database**:
   ```javascript
   exports.getUsersFromDB = () => {
     const data = fs.readFileSync(DB_PATH, 'utf-8');
     return JSON.parse(data);
   };
   ```

   - Reads the `users.json` file and parses it into a JavaScript object.

2. **Save Users to Database**:
   ```javascript
   exports.saveUsersToDB = (users) => {
     fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
   };
   ```

   - Writes the updated users array back to the `users.json` file.

3. **Find, Update, and Delete Users**:
   - Similar logic applies for finding, updating, and deleting users in the mock database.

---

### `utils/jwtUtils.js`

This file contains utility functions for **JWT token generation**.

#### Key Function:

```javascript
require('dotenv').config();

exports.generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
```

- **Explanation**:
  - Generates a JWT token with the provided payload (e.g., user ID and username).
  - The token expires after 1 hour (`expiresIn: '1h'`).

---

### `data/users.json`

This file acts as a **mock database** to store user data.

#### Example Content:

```json
[
  {
    "id": 1,
    "username": "john_doe",
    "password": "$2a$10$EIXaxz6b8j9vFkWJfQ.5Zu/3GvX5pOvPwLqYKJiKU6h7mzXvYrOeC", // hashed password
    "email": "john@example.com"
  }
]
```

- **Explanation**:
  - Each user has an `id`, `username`, `password` (hashed), and `email`.
  - The `password` is hashed using `bcrypt` for security.

---

## Conclusion

By now, you should have a clear understanding of how each file and piece of code in this project works. Here's a quick recap:

1. **`.env`**: Stores environment variables like `PORT` and `JWT_SECRET`.
2. **`index.js`**: Initializes the server and registers routes.
3. **`controllers/userController.js`**: Contains the business logic for handling requests.
4. **`routes/userRoutes.js`**: Defines API routes and maps them to controllers.
5. **`middleware/authMiddleware.js`**: Handles JWT authentication for protected routes.
6. **`models/userModel.js`**: Interacts with the mock database (`users.json`).
7. **`utils/jwtUtils.js`**: Generates JWT tokens.
8. **`data/users.json`**: Acts as a mock database for storing user data.
