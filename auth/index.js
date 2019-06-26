const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto-random-string');

const config = require('../config');

const mailer = require('../mailer');
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
                        console.log(user);
                        const key = crypto({length: 40});
                        User.createVerification(user.id, key, user.email).then(returnData => {
                            const mailOpts = {
                                from: config.email.from,
                                to: user.email,
                                subject: 'Verify your IndexZer0 account.',
                                text : `Please visit ${config.url}/verify/${returnData.key} to verify your account.`,
                                html : `<p>Please visit <a href="${config.url}/verify/${returnData.key}">click here</a> to verify your IndexZer0 account.</p>`
                            };

                            mailer.sendMail(mailOpts, (err, response) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('Mail sent: ', response);
                                }
                            });
                        }).then(() => {
                            jwt.sign({user_id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                                res.json({
                                    token,
                                    userId: user.id
                                });
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

router.put('/verify', (req, res, next) => {
    let key = req.body.key;
    if(key) {
        User.getOneByVerificationKey(key)
        .then(record => {
            if(record) {
                User.update(record.user_id, {active: true}).then(() => {
                    User.deleteActivationRecord(record.user_id).then(() => {
                        res.status(200).send();
                    })
                });
            } else {
                res.status(403).json({message: 'Verification key invalid.'})
            }
        })
    }
})

router.get('/email_test', (req, res) => {
    
    
    
})

module.exports = router;