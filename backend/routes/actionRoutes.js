const express = require('express');
const router = express.Router();
const Action = require('../models/action');

router.get('/:customerId', getCustomerActions, (req, res) => {
  res.json(res.actions);
});

router.post('/:customerId', async (req, res) => {
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
});

async function getCustomerActions(req, res, next) {
  try {
    const actions = await Action.find({ customerId: req.params.customerId });
    res.actions = actions;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
