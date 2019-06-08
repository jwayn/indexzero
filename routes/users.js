const express = require('express');
const verifyToken = require('../middleware/verify-token');

const User = require('../db/user');
const Post = require('../db/post');

const router = express.Router();

// Return a user by ID
router.get('/id=:id', (req, res) => {
    User.getOneById(req.params.id).then(user => {
        if(!user) return res.json({message: 'No user found.'});
        return res.json({
            displayName: user.displayName,
            id: user.id,
            email: user.email,
            score: user.score
        });
    })
});

// Return a user by email
router.get('/email=:email', (req, res) => {
    User.getOneByEmail(req.params.email).then(user => {
        if(!user) return res.json({message: 'No user found.'});
        return res.json({
            displayName: user.displayName,
            id: user.id,
            email: user.email,
            score: user.score
        });
    });
});

//Get all posts of a user by email
router.get('/:email/posts', (req, res, next) => {
    try {
        User.getOneByEmail(req.params.email).then(user => {
            if(user) {
                Post.getAllByEmail(req.params.email).then(posts => {
                    res.json({
                        posts
                    })
                })
            } else {
                const err = new Error('User does not exist.')
                err.status = 400;
                next(err);
            }
        })
    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
})

module.exports = router;