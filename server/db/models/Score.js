const Sequelize = require("sequelize");
const db = require("../db");

const Score = db.define("score", {
  currentScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Score;
