const router = require("express").Router();
const {
  models: { GameSession },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const gameSession = await GameSession.findOne({
      attributes: ["id", "isInSession", "promptList", "round", "gameCode"],
    });
    res.json(gameSession);
  } catch (err) {
    next(err);
  }
});

router.get("/:gameCode", async (req, res, next) => {
  try {
    const { gameCode } = req.params;
    console.log("gameCode BEFORE", gameCode);
    const gameSession = await GameSession.findOne({
      where: { gameCode: gameCode },
    });
    console.log("gameCode AFTER", gameCode);
    console.log("gameSession", gameSession);
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
    res.json(gameSession[0]);
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { isInSession, promptList, round, GameCode } = req.body;

    const [, gameSessionUpdate] = await GameSession.update(
      {
        isInSession: isInSession[0],
        promptList,
        round,
      },
      { where: { gameCode: isInSession[1] }, returning: true, plain: true }
    );
    res.json(gameSessionUpdate);
  } catch (err) {
    next(err);
  }
});
