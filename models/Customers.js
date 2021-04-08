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
            type: String,
            required: [true, 'Please add a phone'],
            maxlength: [20, 'Phone number can not be longer than 20 characters'],
            trim: true,
            unique:true
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
            type: String,
            required: [true, 'Please add a nationality'],
            trim: true,
            maxlength: [50, 'Nationality can not be more than 50 characters']
        }
    },
    { timestamps: true },
    { collection: 'Customer' }
);

CustomerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Customer', CustomerSchema);