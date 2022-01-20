
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paxSchema = new mongoose.Schema({
    tcknOrPassport: {
        type: String,
        required: [true, 'Please add a TC or Passport'],
        trim: true,
        maxlength: [11, 'TC or Passport can not be more than 11 characters']
    },
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
    gender: {
        type: String,
        required: true,
        enum: [
            'E',
            'K'
        ]
    },
    nationality: {
        code: {
            type: String,
            required: [true, 'Please add a nationality'],
            trim: true,
            maxlength: [50, 'Nationality can not be more than 50 characters']
        },
        countryName: {
            type: String,
            required: [true, 'Please add a Country Name'],
            trim: true,
            maxlength: [50, 'Country Name can not be more than 50 characters']
        }
    }

})

const RezervationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.ObjectId,
            ref: 'Customer',
            required: true
        },
        pax: [paxSchema],
        transferType: {
            type: Number,
            required: true,
            enum: [
                0,//Firmanın kendisine ait transferler
                1,//Alınan Transfeler
                2 //Yönlendirilen Transferler
            ],
            default:0
        },
        agency: {
            type: mongoose.Schema.ObjectId,
            ref: 'Agency'
        },
        directionPrice: {
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
            default: null
        },
        employee: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Employee',
            default: null
        }],
        transferDirection: {
            type: String,
            required: true,
            enum: [
                0,//'Havalimanından Noktaya'
                1,//'Noktadan Havalimanına'
                2,//'Noktadan Noktaya'
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
            type: Object,
            required: [true, 'Please add a end point']
        },
        pickUpDate: {
            type: Date
        },
        pickUpTime: {
            type: Date
        },
        dropOffDate: {
            type: Date
        },
        dropOffTime: {
            type: Date
        },
        isReturn: {
            type: Boolean
        },
        endPoint: {
            type: Object,
            required: [true, 'Please add a end point']
        },
        flightNumber: {
            type: String,
            required: [true, 'Please add a flight number'],
            trim: true,
            maxlength: [50, 'Flight number can not be more than 50 characters']
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
        smsNotification: {
            type: Boolean,
            default: false
        },
        uetdsNotification: {
            type: Boolean,
            default: false
        },
        uetdsStatus:{
            type: Boolean,
            default:false
        },
        uetdsRefNumber:{
            type: String,
            max: [255, 'Note must can not be more than 255'],
            trim: true,
            default:null
        },
        priceCurrency: {
            type: String,
            required: true,
            enum: [
                0,//'TURK LİRASI'
                1,//'EURO'
                2,//'DOLAR'
                3,//'POUND'
            ]
        },
        driverStatus: {
            type: Number,
            required: true,
            enum: [
                0, // ödenmedi
                1 // ödendi
            ],
            default:0
        },
        status: {
            type: Number,
            required: true,
            enum: [
                0, // ödenmedi
                1 // ödendi
            ],
            default:0
        },
        uetdsPrice: {
            type: Number,
            required: true
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