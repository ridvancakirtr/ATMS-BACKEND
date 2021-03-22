const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CitySchema = new mongoose.Schema(
    {
        code: {
            type: Number,
            required: [true, 'Please add a code'],
            trim: true,
            minlength: [4, 'City code can not be less than 4 characters'],
            maxlength: [4, 'Code name can not be more than 4 characters']
        },
        cityCode: {
            type: Number,
            required: [true, 'Please add a city code'],
            trim: true,
            maxlength: [2, 'City code can not be more than 4 characters']
        },
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
            maxlength: [50, 'Name can not be more than 50 characters']
        },
        cityName: {
            type: String,
            required: [true, 'Please add a city name'],
            trim: true,
            maxlength: [50, 'City Name can not be more than 50 characters']
        },
    },
    { collection: 'uetdscities' }
);

CitySchema.plugin(mongoosePaginate);


module.exports = mongoose.model('City', CitySchema);