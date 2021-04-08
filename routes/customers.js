const express = require('express');
const router = express.Router({ mergeParams: true });

const { getCustomers, getCustomer, updateCustomer, createCustomer, deleteCustomer } = require('../controllers/customers');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getCustomers);
router.route('/:id').get(protect,getCustomer);
router.route('/').post(protect,createCustomer);
router.route('/:id').put(protect,updateCustomer);
router.route('/:id').delete(protect,deleteCustomer);

module.exports = router;