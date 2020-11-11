const express = require ('express');
const app = express();
const dbconnection = require('./DB_Connection');
const pug = require('pug');
const bodyParser = require('body-parser');
const middleware = require('./middlewares/middlewares')
const cors = require('cors');
const cookieParser = require('cookie-parser')

//app set--------------------------
app.set('view engine', 'pug');
app.set('views', './views');
//Use middleware---------------------------
app.use(cookieParser());
app.use(cors());
app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views/css'));
app.use(bodyParser.json());
//Listening port-------------------------------------
const port = 3001;
//Db_connection---
dbconnection();

//Import Routers--------------------------
const postRoute = require('./routes/post'); 
const authRoute = require('./routes/auth'); 



app.get('/', async (req, res) => {
   res.send("Hello this is phongblog... API");
});

app.get('/api', async (req, res) => {
    res.json({message: 'Hello 🌏🌎🌍'})
});


//Use middleware------------------
app.use('/api', postRoute);
app.use('/api', authRoute);
app.use(middleware.notFound);
app.use(middleware.errorHandler);



//Setup server---------------------------
app.listen(port, () => {
    console.log(`server is flying on port ${port}`);
});