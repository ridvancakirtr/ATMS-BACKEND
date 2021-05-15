const ErrorResponse = require('../utils/errorResponse');
const Agency = require('../models/Agencies');
const asyncHandler = require('../middleware/async');


// @desc    Get All Agencies
// @route   GET /api/v1/agencies/
// @access  Private
const getAgencies = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: '',
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Agency.paginate(query, options).then(function (result) {
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


// @desc    Get Single Agency 
// @route   GET /api/v1/agencies/:id
// @access  Private
const getAgency = asyncHandler(async (req, res, next) => {
    const agency = await Agency.findById(req.params.id);

    if (!agency) {
        return next(new ErrorResponse(`Agency not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: agency
    })
});


// @desc    Create Agency
// @route   POST /api/v1/agencies/
// @access  Private
const createAgency = asyncHandler(async (req, res, next) => {
    const agency = await Agency.create(req.body)

    res.status(201).json({
        success: true,
        data: agency
    })
});

// @desc      Update Agency
// @route     PUT /api/v1/agencies/:id
// @access    Private
const updateAgency = asyncHandler(async (req, res, next) => {
    const agency = await Agency.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!agency) {
        return next(new ErrorResponse(`Agency not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: agency
    });
});


// @desc      Delete Agency
// @route     DELETE /api/v1/agencies/:id
// @access    Private
const deleteAgency = asyncHandler(async (req, res, next) => {
    const agency = await Agency.findById(req.params.id);

    if (!agency) {
        return next(new ErrorResponse(`Agency not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createAgency,
    getAgencies,
    getAgency,
    updateAgency,
    deleteAgency
}