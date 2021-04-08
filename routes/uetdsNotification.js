const express = require('express');
const router = express.Router({ mergeParams: true });

const { sendNotification,cancelNotification } = require('../controllers/uetdsNotification');
const { protect } = require('../middleware/auth')

router.route('/send/:rezervationId').post(protect, sendNotification);
router.route('/cancel/:rezervationId').post(protect, cancelNotification);
module.exports = router;