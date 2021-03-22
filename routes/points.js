const express = require('express');
const router = express.Router({ mergeParams: true });

const { getPoints, getPoint, updatePoint, createPoint, deletePoint } = require('../controllers/points');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getPoints);
router.route('/:id').get(protect,getPoint);
router.route('/').post(protect,createPoint);
router.route('/:id').put(protect,updatePoint);
router.route('/:id').delete(protect,deletePoint);


module.exports = router;