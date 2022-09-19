const userRepo = require("./userRepository");
const bossraidRepo = require("../bossraid/bossraidRepository");

async function createUser() {
  const data = await userRepo.createUser();
  return data;
}

async function readUserById(userId) {
  const totalScore = await bossraidRepo.readTotalScoreByUserId(userId);
  const bossRaidHistory = await bossraidRepo.readBossraidHistoryByUserId(userId);
  const data = { totalScore: totalScore[0].totalScore, bossRaidHistory };
  return data;
}

module.exports = { createUser, readUserById };
