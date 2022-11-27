const Sequelize = require("sequelize");
const db = require("../db");

const GameSession = db.define("gamesession", {
  gameCode: {
    type: Sequelize.STRING,
    isUnique: true,
  },
  isInSession: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  promptList: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ["sculpture", "santa", "peacock", "turkey"],
  },
  round: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = GameSession;
