const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../db/user');

const router = express.Router();

//Ensure that email/password is valid
function validUser(user) {
    const validEmail = typeof user.email == 'string' && 
                        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && 
                        user.password.trim() != '' &&
                        user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/login', (req, res, next) => {
    if(validUser(req.body)) {
        User.getOneByEmail(req.body.email)
        .then(user => {
            if(user) {
                bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if(result){
                        jwt.sign({user_id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                            res.json({token});
                        });
                    } else {
                        res.status = 403
                        res.json({
                            status: 403,
                            message: 'Forbidden.'
                        })
                    }
                });
            } else {
                res.status = 403
                res.json({
                    status: 403,
                    message: 'Forbidden.'
                })
            };
        });
    };
});

router.post('/signup', (req, res, next) => {
    if(validUser(req.body)) {
        User.getOneByEmail(req.body.email)
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        email: req.body.email,
                        password: hash,
                        created_at: new Date(),
                        score: 0
                    };

                    User.create(user)
                    .then(id => {
                        res.json({
                            id,
                            message: 'User created.'
                        });
                    });
                });
            } else {
                const err = new Error('User already exists.');
                err.status = 400;
                next(err)
            }
        });
    } else {
        const err = new Error('Invalid user.');
        err.status = 400;
        next(err)
    }
});

module.exports = router;