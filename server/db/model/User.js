const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    name: Sequelize.STRING,
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      //// Making `.password` act like a func hides it when serializing to JSON.
      // This is a hack to get around Sequelize's lack of a "private" option.
      get() {
        return () => this.getDataValue("password");
      }
    },
    salt: {
      type: Sequelize.STRING,
      // Making `.salt` act like a function hides it when serializing to JSON.
      // This is a hack to get around Sequelize's lack of a "private" option.
      get() {
        return () => this.getDataValue("salt");
      }
    },
    googleId: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);

//instance method

//correctPassword method checks if the password user enters matches the one in the database.
User.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt()) ===
    this.password()
  );
};

//WHAT IS THIS!
User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ["password", "salt"]);
};

// class methods
//generating the salt.
User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash("sha1");
  //hashes the plain text
  hash.update(plainText);
  //hashes with added salt
  hash.update(salt);
  return hash.digest("hex");
};

//user.change is a sequelize method that we pass in a field that checks, if the "password" is different than what we have last time we checked the database then run this function. Or If we have modified the model then, generate the salt and encript the password
function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
}
module.exports = User;
