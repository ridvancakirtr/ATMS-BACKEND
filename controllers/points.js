const ErrorResponse = require('../utils/errorResponse');
const Point = require('../models/Points');
const asyncHandler = require('../middleware/async');


// @desc    Get All Points
// @route   GET /api/v1/points/
// @access  Private
const getPoints = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: 'city',
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Point.paginate(query, options).then(function (result) {
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


// @desc    Get Single Point 
// @route   GET /api/v1/points/:id
// @access  Private
const getPoint = asyncHandler(async (req, res, next) => {
    const point = await Point.findById(req.params.id).populate('city');

    if (!point) {
        return next(new ErrorResponse(`Point not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: point
    })
});


// @desc    Create Point
// @route   POST /api/v1/points/
// @access  Private
const createPoint = asyncHandler(async (req, res, next) => {
    const point = await Point.create(req.body)

    res.status(201).json({
        success: true,
        data: point
    })
});

// @desc      Update Point
// @route     PUT /api/v1/points/:id
// @access    Private
const updatePoint = asyncHandler(async (req, res, next) => {
    const point = await Point.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!point) {
        return next(new ErrorResponse(`Point not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: point
    });
});


// @desc      Delete Point
// @route     DELETE /api/v1/points/:id
// @access    Private
const deletePoint = asyncHandler(async (req, res, next) => {
    const point = await Point.findById(req.params.id);

    if (!point) {
        return next(new ErrorResponse(`Point not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createPoint,
    getPoints,
    getPoint,
    updatePoint,
    deletePoint
}