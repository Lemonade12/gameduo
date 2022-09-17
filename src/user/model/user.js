module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "user",
      charset: "utf8mb4",
    }
  );
};
