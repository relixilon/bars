const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true,
    },
    bar: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    }
  })
);

module.exports = Image;
