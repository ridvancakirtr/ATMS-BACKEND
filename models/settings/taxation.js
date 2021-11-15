const mongoose = require('mongoose');

const TaxationSchema = new mongoose.Schema(
    {
        taxation: {
            type: Boolean,
            default:true
        },
        taxationType: {
            type: Boolean,
            default:true
        },
        taxationRate: {
            type: Number,
            required: [true, 'Please add taxation rate'],
            trim: true,
            default:18
        },
    },
    { collection: 'Taxation' }
);

module.exports = mongoose.model('Taxation', TaxationSchema);