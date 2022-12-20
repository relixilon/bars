const mongoose = require("mongoose");

const Role = mongoose.model(
  "Bar",
  new mongoose.Schema({
    name: String
  })
);

module.exports = Role;
