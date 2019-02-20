const router = require("express").Router();

router.use("/users", require("./users"));

//What if a user requests an API route that doesn't exist? For example, if we're serving up /api/users, what if a user asks for /api/sloths?
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
module.exports = router;
