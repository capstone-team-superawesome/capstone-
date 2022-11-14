const Sequelize = require("sequelize");
const db = require("../db");

const GameSession = db.define("gamesession", {
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = GameSession;
