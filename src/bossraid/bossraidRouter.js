const express = require("express");
const bossraidController = require("./bossraidController");

const router = express.Router();

router.get("/bossraid", bossraidController.readBossraidHistory); // 보스레이드상태조회
router.post("/bossraid/enter", bossraidController.createBossraidHistory); // 보스레이드 입장
router.patch("/bossraid/end", bossraidController.updateBossraidHistory); // 보스레이드 종료

module.exports = router;
