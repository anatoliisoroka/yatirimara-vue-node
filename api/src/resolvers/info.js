const moment = require('moment')
module.exports = {

   Query: {
      info: () => {
         return {
            welcome: "welcome to GraphQL-2021.07.22 Invest",
            time: moment().format('YYYY-MM-DD hh:mm'),
            date: new Date().toString()
         }
      },
   },
};