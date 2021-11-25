const mongoose = require('mongoose');

const TaxationSchema = new mongoose.Schema(
    {
        isTaxation: {
            type: Boolean,
            default:true
        },
        typeOfTaxation: {
            type: Boolean,
            default:true
        },
        localTaxRate: {
            type: Number,
            required: [true, 'Please add taxation rate'],
            trim: true,
            default:18
        },
    },
    { collection: 'Taxation' }
);

module.exports = mongoose.model('Taxation', TaxationSchema);