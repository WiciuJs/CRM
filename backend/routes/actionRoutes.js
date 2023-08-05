const express = require('express');
const router = express.Router({ mergeParams: true });
const actionController = require('../controllers/actionController');

router.get('/', actionController.getCustomerActions);
router.post('/', actionController.createAction);
router.put('/:actionId', actionController.updateAction);
router.delete('/:actionId', actionController.deleteAction);

module.exports = router;
