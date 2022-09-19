const axios = require("axios");

const nodeCache = require("node-cache");
const myCache = new nodeCache({ stdTTL: 0, checkperiod: 600 });

const { StatusCodes } = require("http-status-codes");
const bossraidService = require("./bossraidService");

async function readBossraidHistory(req, res) {
  let bossRaids;
  try {
    if (myCache.has("bossRaids")) {
      console.log("캐쉬에서");
      bossRaids = myCache.get("bossRaids");
    } else {
      let data;
      const url_for_info =
        "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";

      await axios.get(url_for_info).then(function (response) {
        myCache.set("bossRaids", response.data.bossRaids);
      });
      bossRaids = myCache.get("bossRaids");
      console.log(bossRaids[0]);
    }

    const data = await bossraidService.readBossraidHistory(bossRaids[0]);
    return res.status(StatusCodes.OK).send(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function createBossraidHistory(req, res) {
  try {
    const userId = req.body.userId;
    const level = req.body.level;
    let bossRaids;
    if (myCache.has("bossRaids")) {
      console.log("캐쉬에서");
      bossRaids = myCache.get("bossRaids");
    } else {
      let data;
      const url_for_info =
        "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";

      await axios.get(url_for_info).then(function (response) {
        myCache.set("bossRaids", response.data.bossRaids);
      });
      bossRaids = myCache.get("bossRaids");
      console.log(bossRaids[0]);
    }
    const data = await bossraidService.createBossraidHistory(userId, level, bossRaids[0]);
    console.log(data);
    return res.status(StatusCodes.OK).send(data);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateBossraidHistory(req, res) {
  try {
    const userId = req.body.userId;
    const raidRecordId = req.body.raidRecordId;
    let bossRaids;
    if (myCache.has("bossRaids")) {
      console.log("캐쉬에서");
      bossRaids = myCache.get("bossRaids");
    } else {
      let data;
      const url_for_info =
        "https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json";

      await axios.get(url_for_info).then(function (response) {
        myCache.set("bossRaids", response.data.bossRaids);
      });
      bossRaids = myCache.get("bossRaids");
      console.log(bossRaids[0]);
    }
    const data = await bossraidService.updateBossraidHistory(userId, raidRecordId, bossRaids[0]);
    return res.status(StatusCodes.OK).send({ message: "보스레이드 종료" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = { readBossraidHistory, createBossraidHistory, updateBossraidHistory };
