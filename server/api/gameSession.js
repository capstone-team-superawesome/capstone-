const router = require("express").Router();
const {
  models: { GameSession },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const gameSessions = await GameSession.findAll({
      attributes: ["id", "isInSession", "currentPrompt"],
    });
    res.json(gameSessions);
  } catch (err) {
    next(err);
  }

  // router.post("/", async (req, res, next) => {
  //   try {
  //     const gameSessions = await GameSession.findOrCreate({
  //       where: {
  //         isInSession: true,
  //         "prompt1",
  //         "prompt2",
  //         "prompt3",
  //         "prompt4",
  //       },
  //     });
  //     res.json(gameSessions);
  //   } catch (err) {
  //     next(err);
  //   }

  //   router.put("/", async (req, res, next) => {
  //   try {
  //     const gameSessions = await GameSession.findAll({
  //       attributes: [
  //         "id",
  //         "isInSession",
  //         "prompt1",
  //         "prompt2",
  //         "prompt3",
  //         "prompt4",
  //       ],
  //     });
  //     res.json(gameSessions);
  //   } catch (err) {
  //     next(err);
  //   }

  //   router.delete("/", async (req, res, next) => {
  //   try {
  //     const gameSessions = await GameSession.findAll({
  //       attributes: [
  //         "id",
  //         "isInSession",
  //         "prompt1",
  //         "prompt2",
  //         "prompt3",
  //         "prompt4",
  //       ],
  //     });
  //     res.json(gameSessions);
  //   } catch (err) {
  //     next(err);
  //   }
});
