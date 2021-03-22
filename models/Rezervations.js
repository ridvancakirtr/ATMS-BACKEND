const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RezervationSchema = new mongoose.Schema(
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
        pax: {
            type: Array,
            required: true
        },
        transferType: {
            type: String,
            required: true,
            enum: [
                '0',//Firmanın kendisine ait transferler
                '1',//Alınan Transfeler
                '2' //Yönlendirilen Transferler
            ]
        },
        agency:{
            type: mongoose.Schema.ObjectId,
            ref: 'Agency'
        },
        directionPrice:{
            type: Number,
            max: [11, 'Price must can not be more than 11'],
        },
        vehicleType: {
            type: String,
            required: [true, 'Please add a start vehicle type'],
            trim: true,
            maxlength: [50, 'Vehicle type can not be more than 50 characters']
        },
        vehicle: {
            type: mongoose.Schema.ObjectId,
            ref: 'Vehicle',
            default:undefined
        },
        driver:{
            type: mongoose.Schema.ObjectId,
            ref: 'Employee',
            default:undefined
        },
        transferDirection: {
            type: String,
            required: true,
            enum: [
                'Havalimanından Noktaya',
                'Noktadan Havalimanına',
                'Noktadan Noktaya'
            ]
        },
        terminal: {
            type: String,
            required: true,
            enum: [
                'İç Hatlar',
                'Dış Hatlar'
            ]
        },
        startPoint: {
            type: String,
            required: [true, 'Please add a start point'],
            trim: true,
            maxlength: [50, 'Start point can not be more than 50 characters']
        },
        startDate: {
            type: Date
        },
        endPoint: {
            type: String,
            required: [true, 'Please add a end point'],
            trim: true,
            maxlength: [50, 'End point can not be more than 50 characters']
        },
        flightNumber: {
            type: String,
            required: [true, 'Please add a flight number'],
            trim: true,
            maxlength: [50, 'Flight number can not be more than 50 characters']
        },
        isReturn: Boolean,
        returnDate: {
            type: Date
        },
        babySeat: {
            type: Number,
            trim: true,
            maxlength: [2, 'Baby seat can not be more than 2 characters']
        },
        childSeat: {
            type: Number,
            trim: true,
            maxlength: [2, 'Child seat can not be more than 2 characters']
        },
        wheelSeat: {
            type: Number,
            trim: true,
            maxlength: [2, 'Wheel seat can not be more than 2 characters']
        },
        note: {
            type: String,
            max: [255, 'Note must can not be more than 255'],
            trim: true
        },
        sendSms: Boolean,
        priceCurrency: {
            type: String,
            required: true,
            enum: [
                'TURK LİRASI',
                'EURO',
                'DOLAR',
                'POUND'
            ]
        },
        driverStatus: {
            type: String,
            required: true,
            enum: [
                'ÖDENDİ',
                'ÖDENMEDİ'
            ]
        },
        status: {
            type: String,
            required: true,
            enum: [
                'ÖDENDİ',
                'ÖDENMEDİ'
            ]
        },
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true },
    { collection: 'Rezervation' }
);

RezervationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Rezervation', RezervationSchema);