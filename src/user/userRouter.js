const express = require("express");
const userController = require("./userController");

const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user/:userId", userController.readUserById);

module.exports = router;
