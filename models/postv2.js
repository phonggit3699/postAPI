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
    heading1: {
        type: String,
        require: true
    },
    paragraph1: {
        type: String,
        require: true
    },
    img2: String,

    heading2: String,
    paragraph2: String,

    img3: String,

    heading3: String,
    paragraph3: String,
    author: {
        type: String,
        require: "Internet"
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongodb.model('postv2', postSchema);