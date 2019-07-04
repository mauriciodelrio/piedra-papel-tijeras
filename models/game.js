var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for our game model
var gameSchema = Schema({
    player_one      : { type : Schema.Types.ObjectId, ref: 'user', default: null },
    player_two      : { type : Schema.Types.ObjectId, ref: 'user', default: null },
    winner          : { type : String, default: null },
    results         : [{ type : Schema.Types.Mixed, default: [] }],
    created_at      : { type : Date, default: Date.now },

}, {collection: 'game', usePushEach: true});


// create the model for posts and expose it to our app
module.exports = mongoose.model('Game', gameSchema);