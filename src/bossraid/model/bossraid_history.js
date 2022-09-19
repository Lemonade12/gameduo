module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bossraid_history",
    {
      raidRecordId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      level: {
        type: DataTypes.INTEGER,
      },
      score: {
        type: DataTypes.INTEGER,
      },
      enterTime: {
        type: DataTypes.DATE,
      },
      endTime: {
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: true,
      tableName: "bossraid_history",
      charset: "utf8mb4",
    }
  );
};
