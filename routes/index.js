const express = require('express');
const Auth = require('../middleware/verify-token');

const router = express.Router();

router.get('/', Auth.verifyToken, (req, res, next) => {
    res.json({message: '👌'});
});

module.exports = router;