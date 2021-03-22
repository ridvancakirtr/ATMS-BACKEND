const ErrorResponse = require('../utils/errorResponse');
const Rezervation = require('../models/Rezervations');
const asyncHandler = require('../middleware/async');


// @desc    Get All Rezervation
// @route   GET /api/v1/rezervation/
// @access  Private
const getRezervations = asyncHandler(async (req, res, next) => {
    let query = {};
    let options = {};

    const { page, limit } = req.query;

    if (req.params.agencyId) {
        query = { agency: req.params.agencyId };
    }

    if (req.params.vehicleId) {
        query = { vehicle: req.params.vehicleId };
    }

    if (req.params.employeeId) {
        query = { driver: req.params.employeeId };
    }

    options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'driver', 'vehicle'],
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Rezervation.paginate(query, options).then(function (result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            data: pagination,
        })
    });

});

// @desc    Get All Agency Rezervation
// @route   GET /api/v1/rezervation/:agencyId/agency
// @access  Private
const getRezervationAgency = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;

    let query = { agency: req.params.agencyId };

    let options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'driver', 'vehicle'],
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Rezervation.paginate(query, options).then(function (result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            data: pagination,
        })
    });

});

// @desc    Get All Vehicle Rezervation
// @route   GET /api/v1/rezervation/:vehicleId/vehicle
// @access  Private
const getRezervationVehicle = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;

    let query = { vehicle: req.params.vehicleId };

    let options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'driver', 'vehicle'],
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Rezervation.paginate(query, options).then(function (result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            data: pagination,
        })
    });

});

// @desc    Get All Employee Rezervation
// @route   GET /api/v1/rezervation/:employeeId/employee
// @access  Private
const getRezervationEmployee = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;

    let query = { driver: req.params.employeeId };

    let options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'driver', 'vehicle'],
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10
    };

    Rezervation.paginate(query, options).then(function (result) {
        let data = result.docs;
        delete result.docs;
        let pagination = {
            data: data,
            ...result
        }
        res.status(200).json({
            success: true,
            data: pagination,
        })
    });

});

// @desc    Get Single Rezervation 
// @route   GET /api/v1/rezervation/:id
// @access  Private
const getRezervation = asyncHandler(async (req, res, next) => {
    const rezervation = await Rezervation.findById(req.params.id).populate('airport');

    if (!rezervation) {
        return next(new ErrorResponse(`Airport not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: rezervation
    })
});


// @desc    Create Rezervation
// @route   GET /api/v1/rezervation/
// @access  Private
const createRezervation = asyncHandler(async (req, res, next) => {
    const rezervation = await Rezervation.create(req.body)

    res.status(201).json({
        success: true,
        data: rezervation
    })
});

// @desc      Update Airport
// @route     PUT /api/v1/rezervation/:id
// @access    Private
const updateRezervation = asyncHandler(async (req, res, next) => {
    const rezervation = await Rezervation.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: rezervation
    });
});


// @desc      Delete Airport
// @route     DELETE /api/v1/rezervation/:id
// @access    Private
const deleteRezervation = asyncHandler(async (req, res, next) => {
    const rezervation = await Rezervation.findByIdAndDelete(req.params.id);

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});

module.exports = {
    createRezervation,
    getRezervations,
    getRezervationAgency,
    getRezervationVehicle,
    getRezervationEmployee,
    getRezervation,
    updateRezervation,
    deleteRezervation
}