const ErrorResponse = require('../utils/errorResponse');
const Airport = require('../models/Airports');
const asyncHandler = require('../middleware/async');


// @desc    Get All Airports
// @route   GET /api/v1/airports/
// @access  Private
const getAirports = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: 'airport',
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Airport.paginate(query, options).then(function (result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            ...pagination,
        })
    });

});


// @desc    Get Single Airport 
// @route   GET /api/v1/airports/:id
// @access  Private
const getAirport = asyncHandler(async (req, res, next) => {
    const airport = await Airport.findById(req.params.id).populate('airport');

    if (!airport) {
        return next(new ErrorResponse(`Airport not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: airport
    })
});


// @desc    Create Airport
// @route   POST /api/v1/airports/
// @access  Private
const createAirport = asyncHandler(async (req, res, next) => {
    const airport = await Airport.create(req.body)

    res.status(201).json({
        success: true,
        data: airport
    })
});

// @desc      Update Airport
// @route     PUT /api/v1/airports/:id
// @access    Private
const updateAirport = asyncHandler(async (req, res, next) => {
    const airport = await Airport.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!airport) {
        return next(new ErrorResponse(`Airport not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: airport
    });
});


// @desc      Delete Airport
// @route     DELETE /api/v1/airports/:id
// @access    Private
const deleteAirport = asyncHandler(async (req, res, next) => {
    const airport = await Airport.findById(req.params.id);

    if (!airport) {
        return next(new ErrorResponse(`Airport not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}