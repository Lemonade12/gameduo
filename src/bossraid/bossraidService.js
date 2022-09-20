const bossraidRepo = require("./bossraidRepository");
const redis = require("redis");
const redisClient = redis.createClient();
redisClient.on("connect", () => {
  console.info("Redis connected!");
});
redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});
redisClient.connect().then();
//const redisCli = redisClient.v4;

async function readBossraidHistory(bossRaids) {
  const bossRaidLimitSeconds = bossRaids.bossRaidLimitSeconds;
  const latestHistory = await bossraidRepo.readLatestBossraidHistory();
  console.log(latestHistory);
  let canEnter;
  let enteredUserId;
  if (latestHistory.status == "성공" || latestHistory.status == "실패") {
    canEnter = true;
  } else {
    //체크 enterTime
    const nowTime = new Date();
    if (nowTime - latestHistory.enterTime > bossRaidLimitSeconds * 1000) {
      //입장가능
      canEnter = true;
    } else {
      //입장불가능
      canEnter = false;
      enteredUserId = latestHistory.userId;
    }
  }
  const data = { canEnter, enteredUserId };
  console.log(data);
  return data;
}

async function createBossraidHistory(userId, level, bossRaids) {
  //조회하고 입장가능한지 먼저 체크해줘야함 => 조회기능 추가 시
  const { canEnter } = await readBossraidHistory(bossRaids);
  const isEntered = canEnter;
  let raidRecordId;
  if (isEntered) {
    const isEqualLevel = (element) => element.level == level;
    const idx = bossRaids.levels.findIndex(isEqualLevel);
    const score = bossRaids.levels[idx].score; // 해당 level 의 score 값
    const result = await bossraidRepo.createBossraidHistory(userId, score, level);
    raidRecordId = result.raidRecordId;
  }

  const data = { isEntered, raidRecordId };
  return data;
}

async function updateBossraidHistory(userId, raidRecordId, bossRaids) {
  //현재시간이랑 비교해서 성공 실패 나눠줌
  const BossraidHistoryInfo = await bossraidRepo.readBossraidHistoryById(raidRecordId);
  const enterTime = BossraidHistoryInfo.enterTime;
  if (userId !== BossraidHistoryInfo.userId) {
    const error = new Error("저장된 userId 와 raidRecordId 의 정보가 일치하지 않습니다.");
    error.statusCode = 404;
    throw error;
  }
  const nowTime = new Date();
  if (nowTime - enterTime > bossRaids.bossRaidLimitSeconds * 1000) {
    // 시작한지 3분 초과 시 실패로 처리
    const data = await bossraidRepo.updateBossraidHistory(raidRecordId, "실패");
    return data;
  } else {
    // 3분이하 종료 시  성공
    const data = await bossraidRepo.updateBossraidHistory(raidRecordId, "성공");
    return data;
  }
}

async function readBossraidRankByUserId(userId) {
  const value = await redisClient.zRangeWithScores("topRankerInfoList", 0, -1);
  let topRankerInfoList = [];
  let myRankingInfo;

  if (value.length !== 0) {
    // redis에 있는 경우
    console.log("redis");
    for (let i = 0; i < value.length; i++) {
      topRankerInfoList.push({
        ranking: i,
        userId: Number(value[value.length - i - 1].value),
        totalScore: value[value.length - i - 1].score,
      });
      if (topRankerInfoList[i].userId == userId) {
        myRankingInfo = topRankerInfoList[i];
      }
    }
  } else {
    console.log("db");
    topRankerInfoList = await bossraidRepo.readBossraidRank();
    for (let i = 0; i < topRankerInfoList.length; i++) {
      await redisClient.zAdd("topRankerInfoList", [
        {
          score: topRankerInfoList[i].totalScore,
          value: String(topRankerInfoList[i].userId),
        },
      ]);
      topRankerInfoList[i].ranking = i;
      topRankerInfoList[i].totalScore = Number(topRankerInfoList[i].totalScore);
      topRankerInfoList[i].userId = Number(topRankerInfoList[i].userId);

      if (topRankerInfoList[i].userId == userId) {
        myRankingInfo = topRankerInfoList[i];
      }
    }
  }
  const data = { topRankerInfoList, myRankingInfo };
  return data;
}

module.exports = {
  readBossraidHistory,
  createBossraidHistory,
  updateBossraidHistory,
  readBossraidRankByUserId,
};
