const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogStatus = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    campaign_id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    admin_id: String,
    description: String
}, {
    collection: 'log_status',
    timestamps: { updatedAt: false }
});


module.exports = mongoose.model('LogStatus', LogStatus);