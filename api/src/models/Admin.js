const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const { validateEmail } = require("../utils");

let Admin = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        sparse:true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: [validateEmail, 'email'],
    },
    TC: Number,
    pic: String,
    role_id: {
        type: String,
    },
    password: String,
    active: {
        type: Boolean,
        default: true,
    },
}, {
    collection: 'admin',
    timestamps: true
});

Admin.pre('save', function(next){
    if (!this.isModified('password')) return next();

    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if (err){ return next(err) }

        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){return next(err)}
            user.password = hash;
            next();
        })
   })
});

Admin.pre("findOneAndUpdate", function(next) {
    const user = this._update
    const password = user.password
    if(!password) return next();
    bcrypt.genSalt(10, function(err, salt){
        if (err){ return next(err) }

        bcrypt.hash(password, salt, function(err, hash){
            if(err){return next(err)}
            user.password = hash;
            next();
        })
   })    
});

module.exports = mongoose.model('Admin', Admin);