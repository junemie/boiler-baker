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

// sync so that our session table gets created
dbStore.sync();

module.exports = app;

//Middleware: LOGGING  and  BODY-PARSING
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware: SESSION, process.env.SESSION_SECRET is protecting the secret from outside.
app.use(
  session({
    secret: process.env.SESSION_SECRET || "wildly insecure secret",
    store: dbStore,
    resave: false,
    saveUninitialized: false
  })
);

//api routes should come after the session.
app.use("/api", require("./api"));

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
