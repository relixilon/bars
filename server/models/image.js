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
    img: {
      data: Buffer,
      contentType: String,
    },

  })
);

module.exports = Image;
