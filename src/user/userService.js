const userRepo = require("./userRepository");

async function createUser() {
  const data = await userRepo.createUser();
  return data;
}

module.exports = { createUser };
