const fs = require('fs');

const DB_PATH = './data/users.json';

// Read users from the mock database
exports.getUsersFromDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
};

// Save users back to the mock database
exports.saveUsersToDB = (users) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
};

// Find a user by ID
exports.getUserByIdFromDB = (id) => {
  const users = exports.getUsersFromDB();
  return users.find(user => user.id === parseInt(id));
};

// Update a user by ID
exports.updateUserInDB = (id, updates) => {
  const users = exports.getUsersFromDB();
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) return null;

  users[userIndex] = { ...users[userIndex], ...updates };
  exports.saveUsersToDB(users);
  return users[userIndex];
};

// Delete a user by ID
exports.deleteUserFromDB = (id) => {
  const users = exports.getUsersFromDB();
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) return false;

  users.splice(userIndex, 1);
  exports.saveUsersToDB(users);
  return true;
};