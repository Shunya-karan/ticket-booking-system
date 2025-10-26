const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ticketdb", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
