const ErrorResponse = require('../utils/errorResponse');
const Vehicle = require('../models/Vehicles');
const asyncHandler = require('../middleware/async');


// @desc    Get All Vehicles
// @route   GET /api/v1/vehicles/
// @access  Private
const getVehicles = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: '',
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Vehicle.paginate(query, options).then(function (result) {
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


// @desc    Get Single Vehicle 
// @route   GET /api/v1/vehicles/:id
// @access  Private
const getVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: vehicle
    })
});


// @desc    Create Vehicles
// @route   POST /api/v1/vehicles/
// @access  Private
const createVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.create(req.body)

    res.status(201).json({
        success: true,
        data: vehicle
    })
});

// @desc      Update Vehicle
// @route     PUT /api/v1/vehicles/:id
// @access    Private
const updateVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!vehicle) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: vehicle
    });
});


// @desc      Delete Vehicle
// @route     DELETE /api/v1/vehicles/:id
// @access    Private
const deleteVehicle = asyncHandler(async (req, res, next) => {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle
}