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
  const { street, zipcode, city } = address;

  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Klient o podanym identyfikatorze nie został znaleziony" });
    }

    customer.name = name;
    customer.address.street = street;
    customer.address.zipcode = zipcode;
    customer.address.city = city;
    customer.nip = nip;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: "Klient o podanym identyfikatorze nie został znaleziony" });
    }

    await customer.remove();
    res.json({ message: 'Usunięto klienta' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* exports.searchCustomers = async (req, res) => {
  const { query } = req.query;

  try {
    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { 'address.street': { $regex: query, $options: 'i' } },
        { 'address.zipcode': { $regex: query, $options: 'i' } },
        { 'address.city': { $regex: query, $options: 'i' } },
        { nip: { $regex: query, $options: 'i' } },
      ],
    });

    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; */
