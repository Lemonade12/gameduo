const express = require("express");
const userRouter = require("./user/userRouter");
//const bossraidRouter = require("./bossraid/bossraidRouter");
const router = express.Router();

router.use(userRouter);
//router.use(bossraidRouter);

module.exports = router;
