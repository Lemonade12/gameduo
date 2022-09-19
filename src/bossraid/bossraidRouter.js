const express = require("express");
const bossraidController = require("./bossraidController");

const router = express.Router();

router.get("/bossraid", bossraidController.readBossraidHistory);
router.post("/bossraid/enter", bossraidController.createBossraidHistory);
router.patch("/bossraid/end", bossraidController.updateBossraidHistory);

module.exports = router;
