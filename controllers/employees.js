const ErrorResponse = require('../utils/errorResponse');
const Employee = require('../models/Employees');
const asyncHandler = require('../middleware/async');


// @desc    Get All Employees
// @route   GET /api/v1/employees/
// @access  Private
const getEmployees = asyncHandler(async (req, res, next) => {

    const { page, limit } = req.query;

    let query = {};
    let options = {
        select: '',
        sort: { date: -1 },
        populate: 'country',
        lean: true,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Employee.paginate(query, options).then(function (result) {
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


// @desc    Get Single Employee 
// @route   GET /api/v1/employees/:id
// @access  Private
const getEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: employee
    })
});


// @desc    Create Employees
// @route   POST /api/v1/employees/
// @access  Private
const createEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.create(req.body)

    res.status(201).json({
        success: true,
        data: employee
    })
});

// @desc      Update Employee
// @route     PUT /api/v1/employees/:id
// @access    Private
const updateEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!employee) {
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: employee
    });
});


// @desc      Delete Employee
// @route     DELETE /api/v1/employees/:id
// @access    Private
const deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return next(new ErrorResponse(`Employee not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});



module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}