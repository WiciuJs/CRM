const Action = require('../models/action');

exports.getCustomerActions = async (req, res) => {
  try {
    const actions = await Action.find({ customerId: req.params.customerId });
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAction = async (req, res) => {
  const action = new Action({
    customerId: req.params.customerId,
    date: req.body.date,
    type: req.body.type,
    description: req.body.description,
  });

  try {
    const newAction = await action.save();
    res.status(201).json(newAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
