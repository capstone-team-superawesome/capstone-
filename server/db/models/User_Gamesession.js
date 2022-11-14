const Sequelize = require("sequelize");
const db = require("../db");

const User_Gamesession = db.define("user_gamesession", {
  userId: {
    type: Sequelize.INTEGER,
  },
  gamesessionId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = User_Gamesession;
