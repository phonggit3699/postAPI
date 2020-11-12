const mongodb = require('mongoose');
require('dotenv/config');

const dbconnection = () => {
    const connection = mongodb.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) { console.log(err) } else { console.log('DB CONNECTION OK') };
    });
    return connection;
}


module.exports = dbconnection;