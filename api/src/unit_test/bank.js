const models = require('../models');

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const up= async()=>{
    const therapists = await models.Therapist.find({});
    const price_per_session_obj = await models.Setting.findOne({_id: "price_per_session"})
    const price = price_per_session_obj.value || 10
    const cur_year = new Date().getFullYear()
    const cur_month = new Date().getMonth()
    const cur_day = new Date().getDate()
    for(let ii in therapists){
        const rand_int = getRandomArbitrary(2, 4)
        const therapist_id = therapists[ii]._id
        for (let mm = 0; mm< rand_int; mm++){
            const createdAt = new Date(cur_year, cur_month, cur_day, getRandomArbitrary(8, 16))
            await models.Bank.create({therapist_id, price, createdAt})
        }
    }
}

module.exports = up