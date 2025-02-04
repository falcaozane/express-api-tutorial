Certainly! A well-structured `README.md` file is essential for documenting your project, explaining its purpose, and providing instructions on how to set it up and use it. Below is a **proper `README.md`** for your Express API application.

---

# Express API with JWT Authentication

This is a simple RESTful API built using **Express.js** and **Node.js**. The API supports user registration, login, and CRUD operations (Create, Read, Update, Delete) with authentication handled via **JSON Web Tokens (JWT)**. It also uses **Nodemon** for automatic server restarts during development.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Variables](#environment-variables)
5. [Folder Structure](#folder-structure)
6. [API Endpoints](#api-endpoints)
7. [Testing the API](#testing-the-api)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **User Registration**: Create new users with a username, password, and email.
- **User Login**: Authenticate users and generate JWT tokens for protected routes.
- **CRUD Operations**: Perform Create, Read, Update, and Delete operations on users.
- **JWT Authentication**: Secure routes using JSON Web Tokens.
- **Nodemon Integration**: Automatically restart the server during development when files change.

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Postman** (for testing the API): [Download Postman](https://www.postman.com/downloads/)

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/express-api.git
   cd express-api
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory and add the following variables:
     ```env
     PORT=3000
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Start the Server**:
   - For **development** (with Nodemon):
     ```bash
     npm run dev
     ```
   - For **production**:
     ```bash
     npm start
     ```

---

## Environment Variables

The following environment variables are required:

| Variable    | Description                          | Example Value          |
|-------------|--------------------------------------|------------------------|
| `PORT`      | Port on which the server will run   | `3000`                |
| `JWT_SECRET`| Secret key for signing JWT tokens   | `your_jwt_secret_key` |

---

## Folder Structure

```
express-api/
│
├── .env                     # Environment variables (e.g., PORT, JWT_SECRET)
├── package.json             # Node.js project metadata and dependencies
├── index.js                 # Main entry point of the application
│
├── controllers/             # Logic for handling requests (Controller layer)
│   └── userController.js    # User-related logic (e.g., register, login, CRUD)
│
├── routes/                  # Route definitions (Router layer)
│   └── userRoutes.js        # User-related routes (e.g., /register, /login, /users)
│
├── middleware/              # Custom middleware (e.g., authentication)
│   └── authMiddleware.js    # JWT authentication middleware
│
├── models/                  # Data models or database interactions (Model layer)
│   └── userModel.js         # User model (e.g., mock database operations)
│
├── data/                    # Mock database files (if not using a real DB)
│   └── users.json           # JSON file acting as a mock database
│
└── utils/                   # Utility functions (e.g., password hashing, token generation)
    └── jwtUtils.js          # JWT-related utility functions
```

---

## API Endpoints

### 1. **Register a New User**

- **URL**: `/api/register`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "username": "jane_doe",
    "password": "password123",
    "email": "jane@example.com"
  }
  ```
- **Response**:
  ```json
  "User registered successfully"
  ```

---

### 2. **Login and Get JWT Token**

- **URL**: `/api/login`
- **Method**: `POST`
- **Body** (JSON):
  ```json
  {
    "username": "jane_doe",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

---

### 3. **Get All Users** (Protected Route)

- **URL**: `/api/users`
- **Method**: `GET`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer your_jwt_token_here`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "username": "jane_doe",
      "email": "jane@example.com"
    }
  ]
  ```

---

### 4. **Get a Single User by ID** (Protected Route)

- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer your_jwt_token_here`
- **Response**:
  ```json
  {
    "id": 1,
    "username": "jane_doe",
    "email": "jane@example.com"
  }
  ```

---

### 5. **Update a User** (Protected Route)

- **URL**: `/api/users/:id`
- **Method**: `PUT`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer your_jwt_token_here`
- **Body** (JSON):
  ```json
  {
    "username": "updated_jane_doe",
    "email": "updated_jane@example.com"
  }
  ```
- **Response**:
  ```json
  "User updated successfully"
  ```

---

### 6. **Partially Update a User** (Protected Route)

- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer your_jwt_token_here`
- **Body** (JSON):
  ```json
  {
    "email": "patched_jane@example.com"
  }
  ```
- **Response**:
  ```json
  "User partially updated successfully"
  ```

---

### 7. **Delete a User** (Protected Route)

- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer your_jwt_token_here`
- **Response**:
  ```json
  "User deleted successfully"
  ```

---

## Testing the API

You can test the API using **Postman** or any other API testing tool.

1. **Register a new user** (`POST /api/register`).
2. **Log in** (`POST /api/login`) to get a JWT token.
3. Use the JWT token in the `Authorization` header for protected routes:
   - Key: `Authorization`
   - Value: `Bearer your_jwt_token_here`

---

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Please ensure that your code follows the existing style and includes appropriate tests.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## Acknowledgments

- **Express.js**: [https://expressjs.com/](https://expressjs.com/)
- **JSON Web Tokens (JWT)**: [https://jwt.io/](https://jwt.io/)
- **Nodemon**: [https://nodemon.io/](https://nodemon.io/)

---
