var DataTypes = require("sequelize").DataTypes;
var userModel = require("../src/user/model/user");
var bossraidHistoryModel = require("../src/bossraid/model/bossraid_history");

function initModels(sequelize) {
  var user = userModel(sequelize, DataTypes);
  var bossraid_history = bossraidHistoryModel(sequelize, DataTypes);

  bossraid_history.belongsTo(user, { foreignKey: "userId" });
  user.hasMany(bossraid_history, { foreignKey: "userId" });

  return {
    user,
    bossraid_history,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
