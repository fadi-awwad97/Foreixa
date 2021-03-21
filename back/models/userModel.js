const orango = require('orango');

const userSchema = new orango.Schema({

    name: {
        type: String,
        trim: true
    },
    email: {
        type:String
    }, 
    photo: {
        type: String
    },

    CurrenciesFollowing: [String],
        
    
    CurrenciesAdded : [],

    subscriptionType : {
        type:String
    }
});


module.exports = orango.model('users', userSchema);
