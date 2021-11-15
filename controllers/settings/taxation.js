const ErrorResponse = require('../../utils/errorResponse');
const Taxation = require('../../models/settings/taxation');
const asyncHandler = require('../../middleware/async');


// @desc    Get Single Taxation 
// @route   GET /api/v1/taxation/
// @access  Private
const getTaxation = asyncHandler(async (req, res, next) => {
    const taxation = await Taxation.find();

    res.status(200).json({
        success: true,
        data: taxation[0]
    })
});

// @desc      Update Taxation
// @route     PUT /api/v1/taxation/:id
// @access    Private
const updateTaxation = asyncHandler(async (req, res, next) => {
    const taxation = await Taxation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!taxation) {
        return next(new ErrorResponse(`Taxation not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: taxation
    });
});



module.exports = {
    getTaxation,
    updateTaxation
}