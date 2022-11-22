const router = require("express").Router();
const {
  models: { DrawingPrompt },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const prompts = await DrawingPrompt.findAll({
      attributes: ["id", "word"],
    });
    res.json(prompts);
  } catch (err) {
    next(err);
  }
});
