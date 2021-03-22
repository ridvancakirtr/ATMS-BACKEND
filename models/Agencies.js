const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AgenciesSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: [true, 'Please add a company name'],
            trim: true,
            maxlength: [50, 'Company name can not be more than 20 characters']
        },
        taxAdministration: {
            type: String,
            required: [true, 'Please add a tax administration'],
            trim: true,
            maxlength: [50, 'Tax administration can not be more than 50 characters']
        },
        taxNumber: {
            type: Number,
            required: [true, 'Please add a tax number'],
            trim: true,
            maxlength: [50, 'Tax number can not be more than 50 characters'],
            unique: true
        },
        address: {
            type: String,
            required: [true, 'Please add a Address'],
            trim: true,
            maxlength: [50, 'Address can not be more than 50 characters']
        },
        authorizedName: {
            type: String,
            required: [true, 'Please add a authorized name'],
            trim: true,
            maxlength: [50, 'Authorized name can not be more than 50 characters'],
        },
        authorizedSurname: {
            type: String,
            required: [true, 'Please add a authorized surname'],
            trim: true,
            maxlength: [50, 'Authorized surname can not be more than 50 characters'],
        },
        authorizedPhone: {
            type: Number,
            required: [true, 'Please add a authorized phone'],
            trim: true,
            maxlength: [50, 'Authorized phone can not be more than 50 characters'],
        },
        authorizedEmail: {
            type: String,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ],
            maxlength: [50, 'Email can not be longer than 50 characters'],
            trim: true,
        },
        companyOwner:{
            type:Boolean
        }
    },
    { collection: 'Agency' },
    { timestamps: true }
);

AgenciesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Agency', AgenciesSchema);