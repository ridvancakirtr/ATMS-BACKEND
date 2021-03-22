const express = require('express');
const router = express.Router({ mergeParams: true });

const { getAgencies, getAgency, updateAgency, createAgency, deleteAgency } = require('../controllers/agencies');
const { protect } = require('../middleware/auth')

router.route('/').get(protect,getAgencies);
router.route('/:id').get(protect,getAgency);
router.route('/').post(protect,createAgency);
router.route('/:id').put(protect,updateAgency);
router.route('/:id').delete(protect,deleteAgency);
router.route('/:agencyId/rezervations').get(protect,getAgency);


module.exports = router;