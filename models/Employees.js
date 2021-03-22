const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const EmployeeSchema = new mongoose.Schema(
    {
        tcknOrPassport: {
            type: String,
            required: [true, 'Please add a TCKN or Passport'],
            trim: true,
            maxlength: [20, 'TCKN Or Passport can not be more than 20 characters'],
            unique: true
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
        phone: {
            type: String,
            maxlength: [20, 'Phone number can not be longer than 20 characters'],
            trim: true,
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
        country: {
            type: mongoose.Schema.ObjectId,
            ref: 'Country',
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: [
                'Şoför',
                'Şöför Yrd.',
                'Host',
                'Hostes',
                'Diğer',
                'Rehber'
            ]
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        lisanceType: {
            type: String,
            maxlength: [5, 'Lisance type can not be longer than 20 characters'],
            trim: true
        },
        lisanceNumber: {
            type: String,
            maxlength: [50, 'Lisance number can not be longer than 50 characters'],
            trim: true
        },
        office: {
            type: mongoose.Schema.ObjectId,
            ref: 'Office',
            required: true
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