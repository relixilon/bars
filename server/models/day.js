const mongoose = require('mongoose');

const Data = mongoose.model(
  'Data',
  new mongoose.Schema({
    bar: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: Date
    },
    amounts: [
      {
        label: {
          type: String
        },
        value: {
          type: Number
        }
      }
    ],
    notes: {
      type: String
    },
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  })
);

module.exports = Data