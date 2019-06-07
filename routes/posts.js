const express = require('express');

const User = require('../db/user');
const Post = require('../db/post');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
    Post.getAll().then(posts => {
        res.json(posts);
    })
});

// Create a post
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

// Return a post by ID
router.get('/:id', (req, res) => {
    Post.getOneById(req.params.id).then(post => {
        res.json({
            post
        })
    })
});

//update a post by id
router.put('/:id', verifyToken, (req, res) => {
    Post.getOneById(req.params.id)
    .then(post => {
        if(!post) return res.json({message: 'Post does not exist.'});
        if (post.author === req.userData.user_id || req.userData.role === 'admin') {
            Post.update(req.params.id, req.body.post).then(post => {
                res.json(post);
            })
        } else {
            res.status = 403
            res.json({
                status: 403,
                message: 'Forbidden.'
            })
        }
    })
})

// Delete a post if you wrote it, or if you're an admin
router.delete('/:id', verifyToken, (req, res) => {
    Post.getOneById(req.params.id)
    .then(post => {
        if(!post) return res.json({message: 'Post does not exist.'});
        if (post.author === req.userData.user_id || req.userData.role === 'admin') {
            Post.delete(req.params.id)
            .then(() => {
                res.json({
                    message: 'Post deleted.'
                })
            })
        } else {
            res.status = 403
            res.json({
                status: 403,
                message: 'Forbidden.'
            })
        }
    });
});

module.exports = router;