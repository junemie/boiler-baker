const db = require("./db/index");
// // and our server that we already created and used as the previous entry point is 'server.js'
const app = require("./index");

const port = process.env.PORT || 3000;
db.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port`));
});
