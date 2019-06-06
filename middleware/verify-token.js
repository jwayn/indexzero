const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: function(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            req.userData = decodedToken;
        } catch (err) {
            return res.status(401).json({
                message: 'Auth failed.'
            })
        }
        next();
    },
}