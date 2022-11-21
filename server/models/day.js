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
  },
  notes: {
    type: String
  },
  images: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  }
})

module.exports = mongoose.model('Data', dataSchema)