const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rezervation = require('../models/Rezervations');
const uetdsNotification = require('../middleware/uetds-send-notification/uetds-send-notification');

// @desc    Send Notification
// @route   POST /api/v1/uetdsnotification/send/:id
// @access  Private
const sendNotification = asyncHandler(async (req, res, next) => {
    
    let rezervation = await Rezervation.findById(req.params.id)
        .populate('customer')
        .populate('agency')
        .populate('employee')
        .populate('vehicle');

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    console.log(JSON.stringify(rezervation));

    let result = await uetdsNotification.uetdsBildir(JSON.parse(JSON.stringify(rezervation)));

    if (result.status) {
        let updateUetdsRezervation = await Rezervation.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    'uetdsStatus': true,
                    'uetdsRefNumber': result.uetdsSeferRefNo
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updateUetdsRezervation) {
            return next(new ErrorResponse(`Uetds Update Rezervation not found with id of ${req.params.id}`, 404));
        }
    } else {
        return next(new ErrorResponse(`Failed to send U-ETDS`, 404));
    }

    res.status(200).json({
        success: true,
        data:result,
    })

});

// @desc    Cancel Notification
// @route   POST /api/v1/uetdsnotification/cancel/:id
// @access  Private
const cancelNotification = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findById(req.params.id);

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    let result = await uetdsNotification.uetdsIptalEt(JSON.parse(JSON.stringify(rezervation)));
    if (result.status) {
        let updateUetdsRezervation = await Rezervation.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    'uetdsStatus': false,
                    'uetdsRefNumber': null
                }
            },
            {
                new: true,
                runValidators: true
            }
        )

        if (!updateUetdsRezervation) {
            return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
        }
    } else {
        return next(new ErrorResponse(`Failed to cansel U-ETDS`, 404));
    }

    res.status(200).json({
        success: true,
        data:result,
    })

});

// @desc    Print Out PDF
// @route   POST /api/v1/printout/:id
// @access  Private
const printOut = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findById(req.params.id);

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    if (rezervation.uetdsRefNumber==null) {
        return next(new ErrorResponse(`Uetds Ref Number NULL of ${req.params.id}`, 404));
    }

    let result = await uetdsNotification.printOut(rezervation.uetdsRefNumber);
    if (!result.status) {
        return next(new ErrorResponse(`PDF Export Error`, 404));
    }

    res.status(200).json({
        success: true,
        data:result,
    })

});


module.exports = {
    sendNotification,
    cancelNotification,
    printOut
}