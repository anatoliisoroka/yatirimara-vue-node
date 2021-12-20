const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require("../utils");
let User = new Schema({
    _id: String,
    name_first: {
        type: String,
        required: true
    },
    name_last: {
        type: String,
    },
    phone_code: String,
    phone: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    pic: String,
    academic: String,
    website: String,
    social_mail: String,
    social_twitter: String,
    social_youtube: String,
    social_linkedin: String,
    social_facebook: String,
    social_instagram: String,
    // Business & Investment
    ID_number: String,
    birth: String,
    nationality: String,
    country: String,
    city: String,
    district: String,
    post_code: Number,
    address: String,
    // Investment
    MKK: String,
    income_statement_url: String,
    // Business
    education_status: String,
    what_is_your_job: String,
    sector_in_which_it: String,
    experience: String,
    // Account Type, 
    // []: none, 1: Investor, 2: Enterpreneur,
    role: {
        type: [Number],
        default: []
    },
    // 
    individual: {
        type: Boolean,
        default: true,
    },
    // only Users with role 1, 2 can have true
    qualified_investor: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    notification: {
        email_week: {
            type: Boolean,
            default: false
        },
        email_company: {
            type: Boolean,
            default: false
        },
        email_project: {
            type: Boolean,
            default: false
        },
        sms: {
            type: Boolean,
            default: false
        },
    },
    follows: [String]
}, {
    collection: 'user',
    timestamps: true
});

module.exports = mongoose.model('User', User);