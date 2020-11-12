const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    
    const token = req.cookies.userID
    if(!token) {
        res.status(401).json({status: 'Access Denied'});
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_S);
        next();
    } catch (error) {
        res.status(400).json({status: 'Invalid Token'});
    }
}

function verifyTokenCookie(req, res, next) {
    
    if(req.body.tokenC === "" || req.body.tokenC === undefined || req.body.tokenC === null){
        next();
        return;
    }
    const token = req.body.tokenC;


    try {
        const verified = jwt.verify(token, process.env.TOKEN_S);
        res.json({status: "sucess"})
    } catch (error) {
        next();
        res.json({status: 'Invalid Token'});
    }
}

module.exports = {verifyToken, verifyTokenCookie};