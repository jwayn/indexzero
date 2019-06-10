const express = require('express');

const User = require('../db/user');
const Post = require('../db/post');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// Get all posts
router.get('/', (req, res, next) => {
    try {
        Post.getAll().then(posts => {
            res.json(posts);
        });
    } catch {
        const err = new Error('Problem retrieving posts.');
        err.status = 500;
        next(err)
    }
});

// Get recent posts
router.get('/recent/limit=:limit', (req, res, next) => {
    const limit = Number(req.params.limit);
    if(limit) {
        Post.getAllLimited(limit).then(posts => {
            res.json(posts);
        })
    } else {
        const err = new Error('Invalid request.');
        err.status = 400;
        next(err)
    }
});

// Create a post
router.post('/', verifyToken, (req, res) => {
    try {
        if(req.body.post){
            Post.create(req.userData.user_id, req.body.post)
            .then(post => {
                res.json({
                    post,
                    message: 'Post created!'
                });
            });
        };
    } catch {
        const err = new Error('Problem creating post.');
        err.status = 500;
        next(err)
    }
});

// Get a post by ID
router.get('/:id', (req, res, next) => {
    try
    {
        Post.getOneById(req.params.id).then(post => {
            res.json({
                post
            })
        })
    } catch {
        const err = new Error('Problem retrieving post.');
        err.status = 500;
        next(err)
    }
});

//update a post by id
router.put('/:id', verifyToken, (req, res) => {
    Post.getOneById(req.params.id)
    .then(post => {
        if(!post) return res.json({message: 'Post does not exist.'});
        if (post.author === req.userData.user_id || req.userData.role === 'admin') {
            Post.update(req.params.id, req.body.post).then(post => {
                post.updated = Date.now();
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