const express = require('express');

const User = require('../db/user');
const Post = require('../db/post');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// Return a post by ID
router.get('/:id', (req, res) => {
    res.json({
        message: '🔐'
    });
});

// Return all users

router.post('/', verifyToken, (req, res) => {
    if(req.body.post){
        Post.create(req.userData.user_id, req.body.post)
        .then(post => {
            res.json({
                post,
                message: 'Post created!'
            });
        });
    };
});

module.exports = router;