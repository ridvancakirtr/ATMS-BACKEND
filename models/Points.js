const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PointSchema = new mongoose.Schema(
    {
        point: {
            type: String,
            required: [true, 'Please add a point name'],
            trim: true,
            maxlength: [50, 'Point name can not be more than 50 characters']
        },
        hotel: {
            type: String,
            trim: true,
            maxlength: [50, 'Hotel name can not be more than 50 characters']
        },
        type: {
            type: String,
            required: true,
            enum: [
                'Otel',
                'Konum'
            ]
        },
        city: {
            type: mongoose.Schema.ObjectId,
            ref: 'City',
            required: true
        }
    },
    { collection: 'Point' }
);

PointSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Point', PointSchema);