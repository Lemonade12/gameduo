const userRepo = require("./userRepository");
const bossraidRepo = require("../bossraid/bossraidRepository");

async function createUser() {
  const data = await userRepo.createUser();
  return data;
}

async function readUserById(userId) {
  const isExistedUser = await userRepo.readUserById(userId);
  console.log(isExistedUser);
  if (!isExistedUser) {
    const error = new Error("존재하지 않는 유저입니다.");
    error.statusCode = 404;
    throw error;
  }
  const totalScore = await bossraidRepo.readTotalScoreByUserId(userId);
  const bossRaidHistory = await bossraidRepo.readBossraidHistoryByUserId(userId);
  const data = { totalScore: totalScore[0].totalScore, bossRaidHistory };
  return data;
}

module.exports = { createUser, readUserById };
