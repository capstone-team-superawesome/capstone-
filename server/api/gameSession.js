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
    console.log("req.params", req.params);
    console.log("gameCode", gameCode);
    const gameSessions = await GameSession.findOne({
      where: { gameCode: gameCode },
    });
    console.log("gameSessions", gameSessions);

    res.json(gameSessions);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { gameCode, isInSession, promptList, round } = req.body;

    console.log();
    const gameSessions = await GameSession.findOrCreate({
      where: {
        gameCode,
        isInSession,
        promptList,
        round,
      },
    });
    res.json(gameSessions);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { isInSession, promptList, round } = req.body;
    const gameSessions = await GameSession.update({
      isInSession,
      promptList,
      round,
    });
    res.json(gameSessions);
  } catch (err) {
    next(err);
  }
});
