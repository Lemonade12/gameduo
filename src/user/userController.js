const { StatusCodes } = require("http-status-codes");
const userService = require("./userService");

async function createUser(req, res) {
  try {
    const data = await userService.createUser();
    console.log(data);
    return res.status(StatusCodes.OK).send({ userId: data.userId });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { createUser };