var DataTypes = require("sequelize").DataTypes;
var userModel = require("../src/user/model/user");
var bossraidHistoryModel = require("../src/bossraid/model/bossraid_history");
var bossraidModel = require("../src/bossraid/model/bossraid");

function initModels(sequelize) {
  var user = userModel(sequelize, DataTypes);
  var bossraid_history = bossraidHistoryModel(sequelize, DataTypes);
  var bossraid = bossraidModel(sequelize, DataTypes);

  bossraid_history.belongsTo(user, { foreignKey: "userId" });
  user.hasMany(bossraid_history, { foreignKey: "userId" });
  bossraid.belongsTo(user, { foreignKey: "enteredUserId" });
  user.hasOne(bossraid, { foreignKey: "enteredUserId" });

  return {
    user,
    bossraid_history,
    bossraid,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
