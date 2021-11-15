const express = require('express');
const router = express.Router({ mergeParams: true });

const { getTaxation,updateTaxation } = require('../../controllers/settings/taxation');
const { protect } = require('../../middleware/auth')

router.route('/').get(protect,getTaxation);
router.route('/:id').put(protect,updateTaxation);

module.exports = router;