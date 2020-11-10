const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    
    const token = req.header('auth-token');
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

module.exports = verifyToken;