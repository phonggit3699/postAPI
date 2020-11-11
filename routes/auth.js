const express = require('express');
const authModel = require('../models/auth');
const authRouter = express.Router();
const {authValidation} = require('../middlewares/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyTokenCookie} = require('../middlewares/verifyToken');


// authRouter.get('/auth', async (req, res) => {
//     try {
//         const auths = await authModel.find();
//         res.json(auths);
//     }
//     catch (err) {
//         res.json({ error: err });
//     }
// });

authRouter.get('/newAuth', async (req, res) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.render('./auth', {
        url: fullUrl
    });  
});

//Sign up ------------------------------------------------------------------------------
authRouter.post('/newAuth', async (req, res) => {
    //Validation-------------------------------------------------
    const {error, value} = await authValidation(req.body);

    if(error){
        res.json({ status: error.details[0].message});
        return;
    }
    //Check username exist ------------------------------------------------------------
    const userNameExist = await authModel.findOne({ username: req.body.username});

    if(userNameExist){
        res.json({ status: "username already exsits"});
        return
    }

    //Hash password----------------------------------
    const salt = await bcrypt.genSalt(10)
    const hashPassowrd= await bcrypt.hash(req.body.password, salt);

    const auth = new authModel({
        username: req.body.username,

        password: hashPassowrd
    });

    try {
        const saveAuth = await auth.save();
        res.json({ status: "sucess"});
    }
    catch (err) {
        res.json({error: err.message});
    }
    
});

//Login---------------------------------------------
authRouter.post('/findAuth', verifyTokenCookie, async (req, res) => {

    //Validation-------------------------------------------------
    const {error} = await authValidation(req.body);

    if(error){
        res.json({ status: error.details[0].message});
        return;
    }
    //Check username exist ------------------------------------------------------------
    const user = await authModel.findOne({ username: req.body.username});

    if(!user){
        res.json({ status: "username doesn't exsits"});
        return
    }

    //Check password----------------------------------
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        res.json({ status: "Wrong password"});
        return
    }
    //Send Token
    const token = jwt.sign({tokenID: user._id}, process.env.TOKEN_S);
    res.json({ status: "sucess", username: user.username, cookie: token});

   
    
    

  
});


module.exports = authRouter;