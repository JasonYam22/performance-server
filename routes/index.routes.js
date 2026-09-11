const router = require("express").Router();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", require("./auth.routes"))
router.use("/activities", isAuthenticated,require("./activity.routes"))
router.use("/calories", isAuthenticated, require("./calorie.routes"))
router.use("/users", isAuthenticated, require("./user.routes"))
router.use("/paths", isAuthenticated, require("./path.routes"))

module.exports = router;
