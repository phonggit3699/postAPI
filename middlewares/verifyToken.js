const jwt = require('jsonwebtoken');
const authModel = require('../models/auth');

async function verifyToken(req, res, next) {

    const token = req.cookies.userID
    if (!token) {
        res.status(401).redirect('/');
        return;
    }

    try {
        const verified = await jwt.verify(token, process.env.TOKEN_S);
        const userNameExist = await authModel.findOne({ _id: verified.tokenID });
        if (userNameExist) {
            next();
        }
    } catch (error) {
        res.status(400).json({ status: 'Invalid Token' });
    }
}

function verifyTokenCookie(req, res, next) {

    if (req.body.tokenC || "") {
        next();
        return;
    }
    const token = req.body.tokenC;


    try {
        const verified = jwt.verify(token, process.env.TOKEN_S);
        res.json({ status: "sucess" })
    } catch (error) {
        next();
        res.json({ status: 'Invalid Token' });
    }
}

module.exports = { verifyToken, verifyTokenCookie };