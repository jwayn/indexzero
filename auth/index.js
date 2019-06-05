const express = require('express');
const jwt = require('jsonwebtoken');
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
        //Post user to DB, then return message
        res.json({
            message: '🎉'
        });
    } else {
        next(new Error('Invalid User.'))
    }
});

module.exports = router;