const Action = require('../models/action');

exports.getCustomerActions = async (req, res) => {
  try {
    const actions = await Action.find({ customer: req.params.customerId });

    if (actions.length === 0) {
      return res.status(404).json({ message: 'Brak Akcji dla klienta' });
    }

    res.json(actions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.createAction = async (req, res) => {
  const { date, type, description } = req.body;
  const { customerId } = req.params;

  try {
    const newAction = await Action.create({
      customer: customerId,
      date,
      type,
      description,
    });

    res.status(201).json(newAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateAction = async (req, res) => {
  const { date, type, description } = req.body;

  try {
    const updatedAction = await Action.findByIdAndUpdate(
      req.params.actionId,
      { date, type, description },
      { new: true }
    );

    res.json(updatedAction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAction = async (req, res) => {
  try {
    const deletedAction = await Action.findByIdAndRemove(req.params.actionId);

    if (!deletedAction) {
      return res.status(404).json({ message: 'Action not found' });
    }

    res.json({ message: 'Action deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
