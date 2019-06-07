const express = require('express');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

router.get('/', verifyToken, (req, res, next) => {
    res.json({message: '👌'});
});

module.exports = router;