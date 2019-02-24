const router = require("express").Router();
const User = require("../db/model/User");
module.exports = router;

//this route is for the user logsin with our website.
//If user POST to LOGIN - we use post because we are sending a body
/*
1) First, we check if the user exist in our database whose email matches our database email
2) If the email does not match/user does not exist, then you cannot log in! sends 401
3) If there is a user but password the user posted, and does not exist -> it sends 401
4) If there is a user and matches the password - LOG IN! You can use req.login (a method that comes from PASSPORT)
5) This is a way that we can manually set req.user in a way that PASSPORT knows about to properly sync up the session.
6) req.login is async because it has to create a session in the database and could be potentially making another call to TCP our server.
*/

//USER LOGIN: api/auth/login
router.post("/login", async (req, res, next) => {
  try {
    // console.log("THIS ISSSSSSS REQ BODY: ", req.body);
    const user = await User.findOne({
      where: { email: req.body.email }
    });
    console.log("THIS IS USER", user);
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(err);
  }
});

//SIGN UP NEW USER: api/auth/signup
/*
1) Create the new user
2) If it fails to create,because that user already exists: send error msg
3) If we do create a new user, we do req.login (TO LET THE PASSPORT KNOW ABOUT IT) SO THAT PASSPORT CAN SERIALIZE the user to the session and set req.user
*/
router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

//LOG OUT: /api/auth/logout
/*
1) destroys the user session from our SessionStore
2) then it redirects the user to the homepage
*/
router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

//IF USER REFRESHES THE PAGE:
//API/AUTH/ME is whoever is currently logged in
/*
The server doesn't know what is was going on anymore once User refreshes the page.
So, we ask the client code: Hey was I here? Who am I? What am I? Am I logged in?
Server will say: Yeah you were just here, you were logged in as this person
*/

router.get("/me", (req, res) => {
  res.json(req.user);
});
