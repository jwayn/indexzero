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
                            res.json({
                                token,
                                userId: user.id
                            });
                        });
                    } else {
                        res.status = 403
                        res.json({
                            status: 403,
                            message: 'Email or password incorrect.'
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
    console.log('Request!');
    if(validUser(req.body)) {
        User.getOneByEmail(req.body.email)
        .then(user => {
            if(!user) {
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = {
                        email: req.body.email,
                        password: hash,
                        display_name: req.body.displayName,
                        created_at: new Date()
                    };

                    User.create(user)
                    .then(user => {
                        jwt.sign({user_id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                            res.json({
                                token,
                                userId: user.id
                            });
                        });
                    });
                });
            } else {
                const err = new Error('A user with that email address already exists.');
                err.status = 400;
                next(err)
            }
        });
    } else {
        const err = new Error('Invalid email or password.');
        err.status = 400;
        next(err)
    }
});

module.exports = router;