const ErrorResponse = require('../utils/errorResponse');
const VehicleType = require('../models/VehicleTypes');
const asyncHandler = require('../middleware/async');


// @desc    Get All VehicleTypes
// @route   GET /api/v1/vehicletypes/
// @access  Private
const getVehicleTypes = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: +1 },
        populate: '',
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    VehicleType.paginate(query, options).then(function (result) {
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


// @desc    Get Single VehicleType
// @route   GET /api/v1/vehicletypes/:id
// @access  Private
const getVehicleType = asyncHandler(async (req, res, next) => {
    const vehicleType = await VehicleType.findById(req.params.id);

    if (!vehicleType) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: vehicleType
    })
});


// @desc    Create VehicleType
// @route   POST /api/v1/vehicletypes/
// @access  Private
const createVehicleType = asyncHandler(async (req, res, next) => {
    const vehicleType = await VehicleType.create(req.body)

    res.status(201).json({
        success: true,
        data: vehicleType
    })
});

// @desc      Update VehicleType
// @route     PUT /api/v1/vehicletypes/:id
// @access    Private
const updateVehicleType = asyncHandler(async (req, res, next) => {
    const vehicleType = await VehicleType.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!vehicleType) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: vehicleType
    });
});


// @desc      Delete VehicleType
// @route     DELETE /api/v1/vehicletypes/:id
// @access    Private
const deleteVehicleType = asyncHandler(async (req, res, next) => {
    const vehicleType = await VehicleType.findById(req.params.id);

    if (!vehicleType) {
        return next(new ErrorResponse(`Vehicle not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createVehicleType,
    getVehicleTypes,
    getVehicleType,
    updateVehicleType,
    deleteVehicleType
}