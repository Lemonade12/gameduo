const bossraidRepo = require("./bossraidRepository");

async function readBossraid() {
  const data = await bossraidRepo.readBossraid();
  return data;
}

async function createBossraidHistory(userId, level, bossRaids) {
  //조회하고 입장가능한지 먼저 체크해줘야함 => 조회기능 추가 시
  const isEqualLevel = (element) => element.level == level;
  const idx = bossRaids.levels.findIndex(isEqualLevel);
  const score = bossRaids.levels[idx].score; // 해당 level 의 score 값

  const data = await bossraidRepo.createBossraidHistory(userId, score, level);
  return data;
}

async function updateBossraidHistory(userId, raidRecordId, bossRaids) {
  //현재시간이랑 비교해서 성공 실패 나눠줌
  const BossraidHistoryInfo = await bossraidRepo.readBossraidHistoryById(raidRecordId);
  const enterTime = BossraidHistoryInfo.enterTime;
  const nowTime = new Date();
  if (nowTime - enterTime > 180000) {
    // 시작한지 3분 초과 시 실패로 처리
    const data = await bossraidRepo.updateBossraidHistory(
      userId,
      raidRecordId,
      bossRaids.bossRaidLimitSeconds,
      "실패"
    );
    return data;
  } else {
    // 3분이하 종료 시  성공
    const data = await bossraidRepo.updateBossraidHistory(
      userId,
      raidRecordId,
      bossRaids.bossRaidLimitSeconds,
      "성공"
    );
    return data;
  }
}

module.exports = { readBossraid, createBossraidHistory, updateBossraidHistory };
