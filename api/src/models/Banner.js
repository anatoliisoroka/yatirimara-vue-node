const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Banner = new Schema({
    campaign_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    bg: {
        type: String,
        required: true,
    },
    position: String,
    active: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'banner',
    autoIndex: true,
    timestamps: true
});


module.exports = mongoose.model('Banner', Banner);