const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CountrySchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, 'Please add a code'],
            trim: true,
            maxlength: [4, 'Country can not be more than 4 characters']
        },
        countryName: {
            type: String,
            required: [true, 'Please add a country'],
            trim: true,
            maxlength: [50, 'Country can not be more than 50 characters']
        },
    },
    { collection: 'uetdscountry' }
);

CountrySchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Country', CountrySchema);