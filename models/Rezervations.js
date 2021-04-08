const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const paxSchema = new mongoose.Schema({
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
    tcknOrPassport: {
        type: String,
        required: [true, 'Please add a TC or Passport'],
        trim: true,
        maxlength: [11, 'TC or Passport can not be more than 11 characters']
    },
    seatNo: {
        type: String,
        trim: true,
        maxlength: [20, 'KoltukNo can not be more than 11 characters']
    },
    phoneNo: {
        type: String,
        trim: true,
        maxlength: [20, 'TelefonNo can not be more than 11 characters']
    },
    hesCode: {
        type: String,
        trim: true,
        maxlength: [20, 'Hes Kodu can not be more than 11 characters']
    },
    nationality: {
        type: String,
        required: [true, 'Please add a nationality'],
        trim: true,
        maxlength: [50, 'Nationality can not be more than 50 characters']
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
        uetds: {
            status: {
                type: Boolean,
                require: true,
                default: false //false Bildirilmedi | true Bildirildi 
            },
            refNumber: {
                type: String,
                trim: true,
                maxlength: [50, 'RefNumber can not be more than 50 characters'],
                default: '00000000000000'
            },
            baslangicUlke: {
                type: String,
                trim: true,
                maxlength: [50, 'Baslangic Ulke can not be more than 50 characters']
            },
            baslangicIl: {
                type: String,
                trim: true,
                maxlength: [50, 'Baslangic Il can not be more than 50 characters']
            },
            baslangicIlce: {
                type: String,
                trim: true,
                maxlength: [50, 'Baslangic Ilce can not be more than 50 characters']
            },
            bitisUlke: {
                type: String,
                trim: true,
                maxlength: [50, 'Bitis Ulke can not be more than 50 characters']
            },
            bitisIl: {
                type: String,
                trim: true,
                maxlength: [50, 'Bitis Il can not be more than 50 characters']
            },
            bitisIlce: {
                type: String,
                trim: true,
                maxlength: [50, 'Bitis Ilce can not be more than 50 characters']
            }
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
            default: undefined
        },
        employee: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Employee',
            default: undefined
        }],
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