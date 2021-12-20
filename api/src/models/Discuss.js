const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Answer = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: { updatedAt: false }
})

let Discuss = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    campaign_id: {
        type: String,
        required: true,
    },
    answers: {
        type: [Answer],
        default: []
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    collection: 'discuss',
    timestamps: { updatedAt: false }
});


module.exports = mongoose.model('Discuss', Discuss);