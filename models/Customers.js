const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CustomerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [50, 'Brand can not be more than 20 characters']
        },
        surname: {
            type: String,
            required: [true, 'Please add a surname'],
            trim: true,
            maxlength: [50, 'Surname can not be more than 50 characters']
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
                trim: true,
                unique:true
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
            trim: true
        },
        gender: {
            type: String,
            required: true,
            enum: [
                'E',
                'K'
            ]
        },
        tcknOrPassport: {
            type: String,
            required: [true, 'Please add a TC or Passport'],
            trim: true,
            maxlength: [11, 'TC or Passport can not be more than 11 characters']
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
        }
    },
    { timestamps: true },
    { collection: 'Customer' }
);

CustomerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', CustomerSchema);