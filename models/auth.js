const mongodb = require('mongoose');

const authSchema = mongodb.Schema({

    username: {
        type: String,
        require: true,
        min: 6,
        max: 100
    },

    password: {
        type: String,
        require: true,
        min: 6,
        max: 1024
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongodb.model('auth', authSchema);