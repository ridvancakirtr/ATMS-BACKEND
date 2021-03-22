const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const AirportSchema = new mongoose.Schema(
    {
        airport: {
            type: mongoose.Schema.ObjectId,
            ref: 'UetdsAirport',
            required: true
        }
    },
    { collection: 'Airport' }
);

AirportSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Airport', AirportSchema);