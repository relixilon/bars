const db = require("../models");
const User = db.user;
const BARS = db.BARS;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    next();
  });
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    switch (req.body.roles) {
      case "moderator":
        req.body.roles = ["moderator", "user", "admin"];
        break;
      case "admin":
        req.body.roles = ["admin", 'user'];
        break;
      case "user":
        req.body.roles = ["user"];
        break;
      default:
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles
        });
    }
  }

  next();
};
checkBarsExisted = (req, res, next) => {
  if (req.body.bars) {
    for (let i = 0; i < req.body.bars.length; i++) {
      if (!BARS.includes(req.body.bars[i])) {
        res.status(400).send({
          message: `Failed! Bar ${req.body.bars[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted,
  checkBarsExisted
};

module.exports = verifySignUp;