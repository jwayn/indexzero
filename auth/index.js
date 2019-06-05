const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../db/user');

const router = express.Router();

//Route paths are prepended with /auth
router.get('/', (req, res) => {
    res.json({
        message: '🔐'
    });
});


//Ensure that email/password is valid
function validUser(user) {
    console.log(user);
    const validEmail = typeof user.email == 'string' && 
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;

    return validEmail && validPassword
}

router.post('/login', (req, res, next) => {
    jwt.sign({user}, process.env.JWT_KEY, (err, token) => {

    });
})

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User.getOneByEmail(req.body.email)
        .then(user => {
            res.json({
                user,
                message: '👌'
            })
            // bcrypt.hash(req.body.password, 10)
            // .then((hash) => {
            //     //insert user to DB
            //     //redirect
            //     res.json({
            //         hash,
            //         message: '🎉'
            //     });
            // })
        })
    } else {
        next(new Error('Invalid User.'))
    }
});

module.exports = router;