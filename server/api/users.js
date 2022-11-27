const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("../gatekeepingMiddleware");
module.exports = router;

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id) {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

// api/users/edit - edit user
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.id === +req.params.id) {
      const user = await User.findByPk(req.params.id);
      await user.update(req.body);
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id/updateDrawer", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id/addScore", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
