const mongodb = require('mongoose');

const postSchema = mongodb.Schema({

    title: {
        type: String,
        require: true
    },

    img: {
        type: String,
        require: "defautImg"
    },
    des: {
        type: String,
        require: true
    },
    post: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: "Internet"
    },

    category: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongodb.model('post', postSchema);