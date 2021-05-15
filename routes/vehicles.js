const express = require('express');
const router = express.Router({ mergeParams: true });

const { getVehicles, getVehicle, updateVehicle, createVehicle, deleteVehicle } = require('../controllers/vehicles');
const { protect,authorize } = require('../middleware/auth')

router.route('/').get(protect,getVehicles);
router.route('/:id').get(protect,getVehicle);
router.route('/').post(protect,createVehicle);
router.route('/:id').put(protect,updateVehicle);
router.route('/:id').delete(protect,deleteVehicle);

module.exports = router;