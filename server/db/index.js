//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const GameSession = require("./models/GameSession");
const Score = require("./models/Score");
const User_Gamesession = require("./models/User_Gamesession");
const DrawingPrompt = require("./models/DrawingPrompt")

//associations could go here!

//User and GameSession is Many-to-Many
User.belongsToMany(GameSession, { through: User_Gamesession });
GameSession.belongsToMany(User, { through: User_Gamesession });

//User and Score is One-to-Many
User.hasMany(Score);
Score.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    GameSession,
    Score,
    DrawingPrompt
  },
};
