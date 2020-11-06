const express = require ('express');
const app = express();
const dbconnection = require('./DB_Connection');
const pug = require('pug');
const bodyParser = require('body-parser');
const cors = require('cors');
//Listening port
const port = 3000;
app.set('view engine', 'pug');
app.set('views', './views');
//Use middleware
app.use(cors());
app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views/css'));
app.use(bodyParser.json());

//Db_connection
dbconnection();

//Import Routers
const postRoute = require('./routes/post.route'); 

//Use middleware
app.use('/post', postRoute);

app.get('/', async (req, res) => {
   res.send("Hello this is post API");
});


//Setup server 
app.listen(3000, () => {
    console.log(`server is flying on port 3000`);
});