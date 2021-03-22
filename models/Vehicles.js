const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const VehicleSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: [true, 'Please add a brand'],
            trim: true,
            maxlength: [50, 'Brand can not be more than 20 characters']
        },
        model: {
            type: String,
            required: [true, 'Please add a model'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        year: {
            type: Number,
            required: [true, 'Please add a year'],
            trim: true,
            maxlength: [4, 'Year can not be more than 4 characters']
        },
        km: {
            type: Number,
            required: [true, 'Please add a KM'],
            trim: true,
            maxlength: [50, 'KM can not be more than 50 characters']
        },
        plate: {
            type: String,
            required: [true, 'Please add a plate'],
            trim: true,
            maxlength: [50, 'Plate can not be more than 50 characters'],
            unique:true
        },
        note: {
            type: String,
            max: [255, 'Note must can not be more than 255'],
            trim: true
        },
        isRental:{
            type: Boolean,
            default:false
        }
    },
    { timestamps: true },
    { collection: 'Vehicle' }
);

VehicleSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Vehicle', VehicleSchema);