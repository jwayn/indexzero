const express = require('express');

const Post = require('../db/post');
const Tag = require('../db/tag');
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
router.post('/', verifyToken, async (req, res, next) => {
    try {
        if(req.body.post){
            const post = await Post.create(req.userData.user_id, req.body.post);
            if(req.body.tags){
                //Iterate through tags and check if they exist
                req.body.tags.forEach(async (tag) => {
                    try {
                        const tagExists = await Tag.getOneByName(tag);
                        if(tagExists) {
                            //If they do, add tag/post to association table
                            await Post.addPostTag(tagExists.id, post.id)
                        } else {
                            //Otherwise create tag and then add tag/post to association table
                            const newTag = await Tag.create(tag);
                            await Post.addPostTag(newTag[0].id, post.id);
                        }
                    } catch (err) {
                        next(err);
                    }
                });
            }
        }
    } catch (err) {
        next(err)
    }
});

// Get a post by ID
router.get('/:id', async (req, res, next) => {
    try
    {
        let post = await Post.getOneById(req.params.id);
        let likes = await Post.getPostLikes(req.params.id);
        post.likes = await likes.count;
        res.json({post});
    } catch {
        const err = new Error('Problem retrieving post.');
        err.status = 500;
        next(err)
    }
});

router.post('/:id/like', verifyToken, async (req, res, next) => {
    try 
    {
        const like = await Post.addPostLike(req.userData.user_id, req.params.id);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id/like', verifyToken, async (req, res, next) => {
    try {
        const removeLike = await Post.removePostLike(req.userData.user_id, req.params.id);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
})

router.get('/:id/like/:user_id', async (req, res, next) => {
    try {
        likes = await Post.getPostUserLike(req.params.id, req.params.user_id);
        res.json(likes);
    } catch (err) {
        next(err);
    }
})

router.put('/:id/view', async (req, res, next) => {
    try 
    {
        let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        const post = await Post.getOneById(req.params.id);
        Post.update(req.params.id, {views: post.views + 1});
        res.sendStatus(200);
    } catch {
        const err = new Error('Database problem.');
        err.status = 500;
        next(err);
    }
});

// Get all tags associated with a post by ID
router.get('/:id/tags', (req, res, next) => {
    try
    {
        Tag.getAllByPost(req.params.id).then(tags => {
            res.json({
                tags
            })
        })
    } catch {
        const err = new Error('Problem retrieving tags.');
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