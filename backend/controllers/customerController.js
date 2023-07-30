const Customer = require('../models/customer');

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
  res.json(res.customer);
};

exports.updateCustomer = async (req, res) => {
  const { name, address, nip } = req.body;
  const { street, zipcode, city } = address;

  try {
    res.customer.name = name;
    res.customer.address.street = street;
    res.customer.address.zipcode = zipcode;
    res.customer.address.city = city;
    res.customer.nip = nip;

    const updatedCustomer = await res.customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findOneAndDelete({ _id: req.params.id });
    res.json({ message: 'Usunięto klienta' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
