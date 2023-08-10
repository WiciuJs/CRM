const Customer = require('../models/customer');
const express = require('express');
const router = express.Router();

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createCustomer = async (req, res) => {
  const { name, address, nip } = req.body;
  const { street, zipcode, city } = address;

  const customer = new Customer({
    name: name,
    address: {
      street: street,
      zipcode: zipcode,
      city: city,
    },
    nip: nip,
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Klient o podanym identyfikatorze nie został znaleziony" });
    }

    if (!customer.actions) {
      customer.actions = [];
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCustomer = async (req, res) => {
  const { name, address, nip } = req.body;

  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: name,
          ...(address && {
            'address.street': address.street,
            'address.zipcode': address.zipcode,
            'address.city': address.city,
          }),
          nip: nip,
        },
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ message: "Klient o podanym identyfikatorze nie został znaleziony" });
    }

    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id });
    if (!customer) {
      return res.status(404).json({ message: "Klient o podanym identyfikatorze nie został znaleziony" });
    }
    res.json({ message: 'Usunięto klienta' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
