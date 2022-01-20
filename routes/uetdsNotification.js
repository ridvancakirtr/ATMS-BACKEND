const express = require('express');
const router = express.Router({ mergeParams: true });

const { sendNotification,cancelNotification,printOut } = require('../controllers/uetdsNotification');
const { protect } = require('../middleware/auth')

router.route('/send/:id').post(protect, sendNotification);
router.route('/cancel/:id').post(protect, cancelNotification);
router.route('/printout/:id').post(protect, printOut);
module.exports = router;