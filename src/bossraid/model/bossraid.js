module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "bossraid",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      canEnter: {
        type: DataTypes.BOOLEAN,
      },
      enteredUserId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      tableName: "bossraid",
      charset: "utf8mb4",
    }
  );
};
