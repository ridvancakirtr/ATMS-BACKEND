const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Rezervation = require('../models/Rezervations');
const uetdsNotification = require('../middleware/uetds-send-notification/uetds-send-notification');

// @desc    Send Notification
// @route   POST /api/v1/uetdsnotification/send/:rezervationId
// @access  Private
const sendNotification = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findById(req.params.rezervationId)
        .populate('customer')
        .populate('agency')
        .populate('vehicle')
        .populate({
            path: 'employee',
            populate: {
                path: 'country',
                model: 'Country'
            }
        })

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    let result = await uetdsNotification.uetdsBildir(rezervation);

    if (result.status) {
        let updateUetdsRezervation = await Rezervation.findByIdAndUpdate(
            {
                _id: req.params.rezervationId
            },
            {
                $set: {
                    'uetds.status': true,
                    'uetds.refNumber': result.uetdsSeferRefNo
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

        result.rezervation = "Rezervation is Updated"
    } else {
        result.rezervation = "Rezervation is not updated"
    }




    res.status(200).json({
        ...result,

    })

});

// @desc    Cancel Notification
// @route   POST /api/v1/uetdsnotification/cancel/:rezervationId
// @access  Private
const cancelNotification = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findById(req.params.rezervationId);

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    let result = await uetdsNotification.uetdsIptalEt(rezervation);
    console.log(result);
    if (result.status) {
        let updateUetdsRezervation = await Rezervation.findByIdAndUpdate(
            {
                _id: req.params.rezervationId
            },
            {
                $set: {
                    'uetds.refNumber': '00000000000000',
                    'uetds.status': false,
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

        result.rezervation = "Rezervation is updated"
    } else {
        result.rezervation = "Rezervation is not updated"
    }

    res.status(200).json({
        ...result
    })

});



module.exports = {
    sendNotification,
    cancelNotification
}