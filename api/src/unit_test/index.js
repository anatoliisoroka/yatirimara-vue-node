const mongoose = require('mongoose');
mongoose.set('returnOriginal', false)
require('dotenv').config();

const bank = require('./bank')

const run= async()=>{
    await mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    await bank()
    // await message_bot()
    mongoose.connection.close()
}
run()
