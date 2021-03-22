const express = require('express');
const router = express.Router({ mergeParams: true });

const { getVehicleTypes, getVehicleType, updateVehicleType, createVehicleType, deleteVehicleType } = require('../controllers/vehicleTypes');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getVehicleTypes);
router.route('/:id').get(protect,getVehicleType);
router.route('/').post(protect,createVehicleType);
router.route('/:id').put(protect,updateVehicleType);
router.route('/:id').delete(protect,deleteVehicleType);

module.exports = router;