const mongodb = require('mongoose');
require('dotenv/config');

const dbconnection = () => {
    const connection = mongodb.connect("mongodb+srv://PhongBlog:phongpro99@cluster0.hozns.mongodb.net/PhongBlog?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) { console.log(err) } else { console.log('DB CONNECTION OK') };
    });
    return connection;
}


module.exports = dbconnection;