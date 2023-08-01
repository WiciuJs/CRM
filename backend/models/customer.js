const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    city: { type: String, required: true }
  },
  nip: { type: String, required: true },
  actions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }] 
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
