const db = require("../../database/index");
const bossraid_history = db.bossraid_history;
const sequelize = require("sequelize");
const Op = sequelize.Op;

async function readBossraid() {
  //const data = await user.create();
  return "123";
}

async function readLatestBossraidHistory() {
  const data = await bossraid_history.findOne({
    order: [["enterTime", "DESC"]],
  });
  return data;
}

async function readBossraidHistoryById(raidRecordId) {
  const data = await bossraid_history.findOne({
    where: { raidRecordId: raidRecordId },
  });
  return data;
}

async function readTotalScoreByUserId(userId) {
  const data = await bossraid_history.findAll({
    attributes: [[sequelize.fn("sum", sequelize.col("score")), "totalScore"]],
    where: { userId: userId },
    raw: true,
  });
  return data;
}
async function readBossraidHistoryByUserId(userId) {
  const data = await bossraid_history.findAll({
    attributes: ["raidRecordId", "status", "score", "enterTime", "endTime"],
    where: { userId: userId },
    order: [["enterTime", "DESC"]],
  });
  return data;
}

async function createBossraidHistory(userId, score, level) {
  console.log(score);
  const info = {
    userId: userId,
    score: score,
    level: level,
    status: "진행중",
    enterTime: new Date(),
  };
  const data = await bossraid_history.create(info);
  return data;
}

async function updateBossraidHistory(raidRecordId, status) {
  const data = await bossraid_history.update(
    { status: status, endTime: new Date() },
    {
      where: { raidRecordId: raidRecordId },
    }
  );
  return data;
}

module.exports = {
  readBossraid,
  readLatestBossraidHistory,
  readBossraidHistoryById,
  readTotalScoreByUserId,
  readBossraidHistoryByUserId,
  createBossraidHistory,
  updateBossraidHistory,
};
