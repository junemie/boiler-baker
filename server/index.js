const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
//requiring database so that we can connect the session with data.
const db = require("./db");
//configuring and creating database store to connect the session with database
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });

// sync  dbSTore so that our session table gets created
dbStore.sync();

//passport: after getting user session, we want to attach the user to the request object.
const passport = require("passport");

module.exports = app;

//Middleware: LOGGING  and  BODY-PARSING
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//SESSION Middleware process.env.SESSION_SECRET is protecting the secret from outside.
app.use(
  session({
    secret: process.env.SESSION_SECRET || "wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

//PASSPORT Middleware should come after the Session middleware to attch the user id in the object. Make sure to put this AFTER our session middleware!
//After user have the session, there is property available called REQ.SESSION - and this will be unique to every client connected to us. We can track them as individual.
app.use(passport.initialize());
app.use(passport.session());

//Serialize only happens ONCE per SESSION: after user logs in so that passport knows how to remember the user in our session store.
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

//Deserialization runs with every request that contains a serialized user on the session so that PASSPORT gets the key that we used to serialize the
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

//api routes should come after the session.
app.use("/api", require("./api"));
//route for when the user logs in locally with our website without 3rd party
app.use("/auth", require("./auth"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

//sends html files for any requests that don't match one of our API routes.
// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// const port = process.env.PORT || 3000;
// app.listen(port, function() {
//   console.log(`Your server, listening on port ${port}`);
// });
