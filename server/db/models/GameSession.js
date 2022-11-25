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
  currentPrompt: {
    type: Sequelize.STRING,
    defaultValue: "sculpture",
  },
  round: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = GameSession;
