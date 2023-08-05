const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['CALL', 'MEETING', 'MESSAGE'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;


