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
});

module.exports = GameSession;
