const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

let Transaction = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        required: true,
    },
    campaign_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Long,
        required: true,
    },
    payment_method: String
}, {
    collection: 'transaction',
    timestamps: { updatedAt: false }
});


module.exports = mongoose.model('Transaction', Transaction);