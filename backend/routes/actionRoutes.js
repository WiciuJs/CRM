const express = require('express');
const router = express.Router();
const actionController = require('../controllers/actionController');

router.get('/:customerId', actionController.getCustomerActions);
router.post('/:customerId', actionController.createAction);

module.exports = router;
