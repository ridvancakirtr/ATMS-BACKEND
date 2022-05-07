const ErrorResponse = require('../utils/errorResponse');
const Rezervation = require('../models/Rezervations');
const asyncHandler = require('../middleware/async');

// @desc    Get All Rezervation
// @route   GET /api/v1/rezervation/?startDate=2021-5-12&endDate=2023-5-5&direction=2
// @access  Private
// @variable  direction=0 - direction=1 - direction=2 
const getRezervations = asyncHandler(async (req, res, next) => {
    let query = {};
    let options = {};

    const { page, limit } = req.query;
    
    if (req.query.startDate && req.query.endDate) {

        let sDate=new Date(req.query.startDate)
        let eDate=new Date(req.query.endDate)

        sDate.setUTCHours(0,0,0);
        eDate.setUTCHours(23,59,59,999);
        

        query = {pickUpDateTime:{$gte:new Date(sDate),$lt:new Date(eDate)}}
    }

    if (req.query.direction==0 || req.query.direction==1 || req.query.direction==2) {
        Object.assign(query,{transferDirection:req.query.direction});
    }
  
    if (req.params.agencyId) {
        query = { agency: req.params.agencyId };
    }

    if (req.params.vehicleId) {
        query = { vehicle: req.params.vehicleId };
    }

    if (req.params.employeeId) {
        query = { employee: req.params.employeeId };
    }

    if (req.params.vehicleTypeId) {
        query = { vehicleType: req.params.vehicleTypeId };
    }

    options = {
        select: '',
        sort: { date: -1 },
        populate: ['customer', 'agency', 'employee', 'vehicle', 'vehicleType'],
        lean: false,
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
            ...pagination,
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
        populate: ['agency', 'employee', 'vehicle'],
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
        populate: ['agency', 'employee', 'vehicle'],
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

    let query = { employee: req.params.employeeId };

    let options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'employee', 'vehicle','country'],
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
// @route   GET /api/v1/rezervation/:customerId/customer
// @access  Private
const getRezervationCustomer = asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;

    let query = { customer: req.params.customerId };

    let options = {
        select: '',
        sort: { date: -1 },
        populate: ['agency', 'employee', 'vehicle', 'customer'],
        lean: false,
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
            ...pagination,
        })
    });

});

// @desc    Get Single Rezervation 
// @route   GET /api/v1/rezervation/:id
// @access  Private
const getRezervation = asyncHandler(async (req, res, next) => {

    const rezervation = await Rezervation.findById(req.params.id)
        .populate('customer')
        .populate('agency')
        .populate('employee')
        .populate('vehicle')
        .populate('vehicleType');

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
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
    let departureWay,returnWay=null
    let rezObject=req.body

    departureWay = await Rezervation.create(rezObject);
    
     //Return Transfer 
    if(rezObject.isReturn){
        let lock=false
        
        if(rezObject.transferDirection==0){
            rezObject.transferDirection=null
            rezObject.transferDirection=1
            lock=true
        }

        if(rezObject.transferDirection==1 && !lock){
            rezObject.transferDirection=null
            rezObject.transferDirection=0
        }

        let tempStartPoint=rezObject.startPoint
        let tempEndPoint=rezObject.endPoint
        let tempDropOffDateTime=rezObject.dropOffDateTime

        delete rezObject.dropOffDateTime

        rezObject.startPoint=null
        rezObject.startPoint=tempEndPoint

        rezObject.endPoint=null
        rezObject.endPoint=tempStartPoint
        
        rezObject.pickUpDateTime=null
        rezObject.pickUpDateTime=tempDropOffDateTime

        returnWay= await Rezervation.create(rezObject);
        
    }
    
    res.status(201).json({
        success: true,
        data: {
            departureWay,
            returnWay
        }
    })
});

// @desc      Update Rezervation
// @route     PUT /api/v1/rezervation/:id
// @access    Private
const updateRezervation = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findByIdAndUpdate(req.params.id, req.body,{upsert: true}).populate('customer');
    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: rezervation
    });
});

// @desc      Update Vehicle of Rezervation
// @route     PUT /api/v1/rezervation/:id/vehicle
// @access    Private
const updateVehicleOfRezervation = asyncHandler(async (req, res, next) => {
    let rezervation = await Rezervation.findByIdAndUpdate({_id:req.params.id}, { $set: {vehicle:req.body.vehicle} },{useFindAndModify: false});
    
    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: rezervation
    });
});

// @desc      Update Employee of Rezervation
// @route     PUT /api/v1/rezervation/:id/employee
// @access    Private
const updateEmployeeOfRezervation = asyncHandler(async (req, res, next) => {
    
    let rezervation = await Rezervation.findByIdAndUpdate({_id:req.params.id}, { $set: {employee:req.body.employee} },{useFindAndModify: false});

    if (!rezervation) {
        return next(new ErrorResponse(`Rezervation not found with id of ${req.params.id}`, 404));
    }
    console.log(rezervation);
    res.status(200).json({
        success: true,
        data: rezervation
    });
});

// @desc      Delete Rezervation
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
    getRezervationCustomer,
    getRezervation,
    updateRezervation,
    deleteRezervation,
    updateVehicleOfRezervation,
    updateEmployeeOfRezervation
}