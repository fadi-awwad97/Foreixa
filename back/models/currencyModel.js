const { json } = require('body-parser');
const orango = require('orango');

const currencySchema = new orango.Schema({

    currency: {}
    

});


module.exports = orango.model('currency', currencySchema);