const express = require('express');
const router = express.Router({ mergeParams: true });

const { getEmployees, getEmployee, updateEmployee, createEmployee, deleteEmployee } = require('../controllers/employees');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getEmployees);
router.route('/:id').get(protect,getEmployee);
router.route('/').post(protect,createEmployee);
router.route('/:id').put(protect,updateEmployee);
router.route('/:id').delete(protect,deleteEmployee);

module.exports = router;