const router = require("express").Router();
const {
  models: { GameSession },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const gameSessions = await GameSession.findAll({
      attributes: ["id", "isInSession", "promptList"],
    });
    res.json(gameSessions);
  } catch (err) {
    next(err);
  }
});

router.get("/:gameCode", async (req, res, next) => {
  try {
    const { gameCode } = req.params;
    const gameSession = await GameSession.findOne({
      where: { gameCode: gameCode },
    });

    res.json(gameSession);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { gameCode, isInSession, promptList, round } = req.body;

    const gameSession = await GameSession.findOrCreate({
      where: {
        gameCode,
        isInSession,
        promptList,
        round,
      },
    });
    console.log("gameSession CREATION ROUTE", gameSession);
    res.json(gameSession[0]);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { gameCode, isInSession, promptList, round } = req.body;

    console.log(
      "ALL PARAMATERS IN UPDATE ROUTE",
      "gameCode",
      "isInSession",
      "promptList",
      "round",
      gameCode,
      isInSession,
      promptList,
      round
    );
    const gameSessionUpdate = await GameSession.update(
      {
        isInSession,
        promptList,
        round,
      },
      { where: { gameCode: gameCode } }
    );
    console.log("ROUTER UPDATE GAMESESSION", gameSessionUpdate);
    res.json(gameSessionUpdate);
  } catch (err) {
    next(err);
  }
});
