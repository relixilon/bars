const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.js");
db.day = require("./day.js");
db.role = require("./role.js");
db.image = require("./image.js");
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
