var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our user model
var userSchema = Schema({

    nickname    : { type : String, default: '' },
    winners     : { type: Number, default: 0 },
    created_at  : { type : Date, default: Date.now },
    updated_at  : { type : Date, default: Date.now },
    deleted     : { type : Boolean, default: false },

}, {collection: 'user', usePushEach: true});


// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);