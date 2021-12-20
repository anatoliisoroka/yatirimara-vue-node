const mongoose = require('mongoose');
const models = require('../models');
const up = async () => {
    const is_any_admin = await models.Admin.findOne({
        role_id: 'super'
    });
    if (!is_any_admin) {
        await models.Admin.create({
            _id: new mongoose.mongo.ObjectId(),
            name: "admin",
            email: "admin@gmail.com",
            phone: "123456789",
            role_id: 'super',
            active: true,
            password: '123456'
        });
    }
}

module.exports = up