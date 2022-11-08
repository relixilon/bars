const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  bar: {
    required: true,
    type: String
  },
  date: {
    required: true,
    type: Date
  },
  amount: {
    required: true,
    type: Number
  }
})

module.exports = mongoose.model('Data', dataSchema)