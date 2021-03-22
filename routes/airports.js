const express = require('express');
const router = express.Router({ mergeParams: true });

const { getAirports, getAirport, updateAirport, createAirport, deleteAirport } = require('../controllers/airports');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getAirports);
router.route('/:id').get(protect,getAirport);
router.route('/').post(protect,createAirport);
router.route('/:id').put(protect,updateAirport);
router.route('/:id').delete(protect,deleteAirport);


module.exports = router;