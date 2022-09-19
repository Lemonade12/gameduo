const userRepo = require("./userRepository");

async function createUser() {
  const data = await userRepo.createUser();
  return data;
}

async function readUserById(userId) {
  const data = await userRepo.readUserById(userId);
  return data;
}

module.exports = { createUser, readUserById };
