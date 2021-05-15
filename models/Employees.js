const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const EmployeeSchema = new mongoose.Schema(
    {
        tcknOrPassport: {
            type: String,
            unique: true,
            required: [true, 'Please add a TCKN or Passport'],
            trim: true,
            maxlength: [20, 'TCKN Or Passport can not be more than 20 characters']
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        surname: {
            type: String,
            required: [true, 'Please add a surname'],
            trim: true,
            maxlength: [50, 'Surname can not be more than 50 characters']
        },
        gender: {
            type: String,
            required: true,
            enum: [
                'E',
                'K'
            ]
        },
        phone: {
            countryCode:{
                type: String,
                required:true,
                trim: true,
            },
            nationalNumber:{
                type: String,
                required:true,
                trim: true,
            },
            countryCallingCode:{
                type: String,
                required:true,
                trim: true,
            },
            formattedNumber:{
                type: String,
                required:true,
                trim: true
            },
            phoneNumber:{
                type: String,
                required:true,
                trim: true
            }
        },
        email: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
            maxlength: [50, 'Email can not be longer than 50 characters'],
            trim: true,
        },
        nationality: {
            code:{
                type: String,
                required:true,
                trim: true
            },
            countryName:{
                type: String,
                required:true,
                trim: true
            }
        },
        type: {
            type: Number,
            required: true,
            enum: [
                0,
                1,
                2,
                3,
                4,
                5
            ]
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        lisanceType: {
            type: String,
            maxlength: [5, 'Lisance type can not be longer than 5 characters'],
            trim: true
        },
        lisanceNumber: {
            type: String,
            maxlength: [5, 'Lisance number can not be longer than 5 characters'],
            trim: true
        },
        address: {
            type: String,
            max: [255, 'Address must can not be more than 255'],
            trim: true
        },
    },
    { timestamps: true },
    { collection: 'Employee' }
);

EmployeeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Employee', EmployeeSchema);