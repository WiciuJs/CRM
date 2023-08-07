const express = require('express');
const router = express.Router({ mergeParams: true });
const actionController = require('../controllers/actionController');
router.get('/:customerId', actionController.getCustomerActions);
router.post('/:customerId', actionController.createAction);
router.put('/:actionId', actionController.updateAction);
router.delete('/:actionId', actionController.deleteAction);


module.exports = router;


