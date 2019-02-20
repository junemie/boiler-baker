const router = require("express").Router();
//IMPORT USER TABLE HERE LATER....
//const User = require("../db/models")
router.get("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
