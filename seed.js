const db = require("./server/db");
const User = require("./server/db/model/User");

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      name: "Cody",
      email: "cody@email.com",
      password: "12345"
    });
    console.log(`
      Seed success!
    `);
    db.close();
  } catch (err) {
    console.error(`
      Oh noes!
    `);
    console.error(err.stack);
    db.close();
  }
};

seed();
