const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Role = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },   
    permission: {
        type: [String],
        enumn: ['USER', 'ROLE', 'PUBLISH', 'ACCOUNTING', 'INVESTMENT', 'CAMPAIGN']
    },

}, {
    collection: 'role',
    timestamps: true
});


module.exports = mongoose.model('Role', Role);