const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Log = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        trim: true,
    },   
    browser: String,
    status: Boolean,
}, {
    collection: 'log',
    timestamps: {updatedAt: false}
});


module.exports = mongoose.model('Log', Log);