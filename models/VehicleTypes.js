const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const VehicleTypesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a vehicle name'],
            trim: true,
            maxlength: [50, 'Vehicle name can not be more than 20 characters']
        },
        pax: {
            type: Number,
            required: [true, 'Please add a pax'],
            trim: true,
            maxlength: [2, 'Pax can not be more than 2 characters']
        },
        queue: {
            type: Number,
            required: [true, 'Please add a queue'],
            trim: true,
            maxlength: [2, 'Queue can not be more than 2 characters'],
            unique:true
        },
    },
    { timestamps: true },
    { collection: 'VehicleType' }
);

VehicleTypesSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('VehicleType', VehicleTypesSchema);