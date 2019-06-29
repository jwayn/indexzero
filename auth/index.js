const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

const config = require('../config');
const verifyToken = require('../middleware/verify-token');
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

function generateToken() {
    var buf = new Buffer.alloc(16);
    for (var i = 0; i < buf.length; i++) {
        buf[i] = Math.floor(Math.random() * 256);
    }
    var id = buf.toString('base64');
    return id;
}

router.post('/login', async (req, res, next) => {
    try{
        if(validUser(req.body)) {
            const user = await User.getOneByEmail(req.body.email);
            if(user) {
                const result = await bcrypt.compare(req.body.password, user.password);
                if(result){
                    jwt.sign({user_id: user.id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                        res.json({
                            token,
                            userId: user.id
                        });
                    });
                } else {
                    next(createError(403, 'Forbidden'));
                }
            } else {
                next(createError(403, 'Forbidden'));
            };
        };
    } catch (err) {
        next(err)
    }
});

router.post('/signup', async (req, res, next) => {
    console.log('Request!');
    if(validUser(req.body)) {
        const user = await User.getOneByEmail(req.body.email)
        if(!user) {
            const hash = await bcrypt.hash(req.body.password, 10)
            const user = {
                email: req.body.email,
                password: hash,
                display_name: req.body.displayName,
                created_at: new Date()
            };

            const newUser = await User.create(user);
            const key = await generateToken();
            const returnData = await User.createVerification(newUser.id, key, newUser.email)
            const mailOpts = {
                from: config.email.from,
                to: newUser.email,
                subject: 'Verify your IndexZer0 account.',
                text : `Please visit ${config.url}/verify/${returnData.key} to verify your account.`,
                html : `<p>Please visit <a href="${config.url}/verify/${returnData.key}">click here</a> to verify your IndexZer0 account.</p>`
            };

            await mailer.sendMail(mailOpts, (err, response) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Mail sent: ', response);
                }
            });

            await jwt.sign({user_id: newUser.id, role: newUser.role}, process.env.JWT_SECRET, {expiresIn: '1d'}, (err, token) => {
                res.json({
                    token,
                    userId: newUser.id
                });
            });

        } else {
            const err = new Error('A user with that email address already exists.');
            err.status = 400;
            next(err)
        }
    } else {
        const err = new Error('Invalid email or password.');
        err.status = 400;
        next(err)
    }
});

router.put('/verify', async (req, res, next) => {
    let key = req.body.key;
    if(key) {
        const record = await User.getOneByVerificationKey(key)
        if(record) {
            await User.update(record.user_id, {active: true});
            await User.deleteActivationRecord(record.user_id);
            res.status(200).json({message: 'User verified.'});
        } else {
            next(createError(403, 'Verification key is invalid.'));
        }
    }
});

router.put('/reset-password', verifyToken, async (req, res, next) => {
    try {
        if(req.body.oldPassword) {
            const user = await User.getOneById(req.userData.user_id)
            if(user) {
                // Verify user password and change it to new password'
                const result = await bcrypt.compare(req.body.oldPassword, user.password)
                if(result) {
                    // Change pw to new pw
                    const hash = await bcrypt.hash(req.body.newPassword, 10);
                    await User.update(user.id, {password: hash})
                    res.status(200).json({message: 'Password updated.'});
                } else {
                    next(createError(403, 'Password incorrect.'));
                };
            } else {
                next(createError(403, 'Forbidden.'))
            }
        } else {
            next(createError(401, 'User sent insufficient data.'));
        }
    } catch (err) {
        next(err);
    }
});

router.get('/forgot-password', (req, res, next) => {
    // Insert email/key into reset_password table
    // Send user an email with link to reset password if email exists in the database
});

router.put('/forgot-password', (req, res, next) => {
    // Reset the users password if their key matches and is < 1 hour old
})

module.exports = router;