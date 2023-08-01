const Action = require('../models/action');

exports.getCustomerActions = async (req, res) => {
  try {
    const actions = await Action.find({ customer: req.params.customerId });
    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAction = async (req, res) => {
  const { date, type, description } = req.body;
  const { customerId } = req.params;

  const action = new Action({
    customer: customerId,
    date,
    type,
    description,
  });

  try {
    const newAction = await action.save();
    res.status(201).json(newAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
