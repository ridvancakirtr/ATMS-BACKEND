const express = require('express');
const router = express.Router({ mergeParams: true });

const { getUetdsAirports, getUetdsCities, getUetdsCountry } = require('../controllers/uetds');
const { protect } = require('../middleware/auth')

router.route('/airports').get(protect, getUetdsAirports);
router.route('/countries').get(protect, getUetdsCountry);
router.route('/cities').get(protect, getUetdsCities);

module.exports = router;