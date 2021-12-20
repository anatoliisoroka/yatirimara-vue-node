const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Document = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    campaign_id: {
        type: String,
        required: true,
    },  
    name: {
        type: String,
        required: true,
    },  
    type: {
        type: String,
        required: true,
    }, 
    url: {
        type: String,
        required: true,
    },
    size: String,
}, {
    collection: 'document',
    timestamps: {updatedAt: false}
});


module.exports = mongoose.model('Document', Document);