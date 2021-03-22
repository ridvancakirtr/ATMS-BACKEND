const ErrorResponse = require('../utils/errorResponse');
const UetdsAirports = require('../models/_UetdsAirports');
const UetdsCities = require('../models/_UetdsCities');
const UetdsCountry = require('../models/_UetdsCountry');
const asyncHandler = require('../middleware/async');


// @desc    Get All Uetds Airports
// @route   GET /api/v1/uetds/airports
// @access  Private
const getUetdsAirports = asyncHandler(async (req, res, next) => {

    const uetdsAirports = await UetdsAirports.find({});

    if (!uetdsAirports) {
        return next(new ErrorResponse(`Uetds Airports not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: uetdsAirports
    })

});

// @desc    Get All Uetds Cities
// @route   GET /api/v1/uetds/cities
// @access  Private
const getUetdsCities = asyncHandler(async (req, res, next) => {

    const uetdsCities = await UetdsCities.find({});

    if (!uetdsCities) {
        return next(new ErrorResponse(`Uetds Cities not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: uetdsCities
    })

});


// @desc    Get All Uetds Airports
// @route   GET /api/v1/uetds/countries
// @access  Private
const getUetdsCountry = asyncHandler(async (req, res, next) => {

    const uetdsCountry = await UetdsCountry.find({});

    if (!uetdsCountry) {
        return next(new ErrorResponse(`Uetds Country not found`, 404));
    }

    res.status(200).json({
        success: true,
        data: uetdsCountry
    })

});

module.exports = {
    getUetdsAirports,
    getUetdsCities,
    getUetdsCountry
}