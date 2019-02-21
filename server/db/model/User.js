const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define("user", {
  name: Sequelize.STRING,
  email: {
    allowNull: false,
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
});

module.exports = User;
