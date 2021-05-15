const ErrorResponse = require('../utils/errorResponse');
const Customer = require('../models/Customers');
const asyncHandler = require('../middleware/async');


// @desc    Get All Customers
// @route   GET /api/v1/customers/
// @access  Private
const getCustomers = asyncHandler(async (req, res, next) => {

    const { page, limit, search } = req.query;

    let query = {};

    if (typeof search != "undefined") {
        query = {
            $or:
                [
                    { "tcknOrPassport": { $regex: search, $options: "i" } },
                    { "name": { $regex: search, $options: "i" } },
                    { "surname": { $regex: search, $options: "i" } },
                    { "email": { $regex: search, $options: "i" } },
                    { "phone": { $regex: search, $options: "i" } },
                    { "gender": { $regex: search, $options: "i" } },
                    { "nationality": { $regex: search, $options: "i" } }
                ]
        }
    }

    let options = {
        select: '',
        sort: { createdAt: -1 },
        populate: '',
        lean: false,
        page: parseInt(Number(page) < 0 ? 0 : Number(page), 10) || 1,
        limit: parseInt(Number(limit) <= 0 ? 1 : Number(limit), 10) || 10,
    };

    Customer.paginate(query, options).then(function (result) {
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


// @desc    Get Single Customers 
// @route   GET /api/v1/customers/:id
// @access  Private
const getCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
        return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: customer
    })
});


// @desc    Create Customer
// @route   POST /api/v1/customers/
// @access  Private
const createCustomer = asyncHandler(async (req, res, next) => {
    const customerCheck = await Customer.findOne({ phone: req.body.phone })

    if (customerCheck == 'null') {
        return next(new ErrorResponse(`Customers is avaliable with phone of ${req.body.phone}`, 404));
    }

    const customer = await Customer.create(req.body)

    res.status(201).json({
        success: true,
        data: customer
    })


});

// @desc      Update Customers
// @route     PUT /api/v1/customers/:id
// @access    Private
const updateCustomer = asyncHandler(async (req, res, next) => {
    const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!customers) {
        return next(new ErrorResponse(`Customers not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: customers
    });
});


// @desc      Delete Customers
// @route     DELETE /api/v1/customers/:id
// @access    Private
const deleteCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findOneAndDelete(req.params.id);
    console.log("-->", req.params.id);
    if (!customer) {
        return next(new ErrorResponse(`Customer not found with id of ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        data: {}
    });
});


module.exports = {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
}