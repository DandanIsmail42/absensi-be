const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("absensi", "root", "root", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
