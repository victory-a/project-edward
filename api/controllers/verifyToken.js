const jwt = require('jsonwebtoken');

// middleware for private routes
module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Forbidden');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
}