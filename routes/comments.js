const express = require('express');

const User = require('../db/user');
const Comment = require('../db/comment');
const Post = require('../db/user');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// Return a comment by id
router.get('/:id', (req, res) => {
    res.json({
        message: '🔐'
    });
});

router.get('/:postid', verifyToken, (req, res) => {
    if(req.params.postid){
        //get all comments with parent postid
    };
});

//Create a new comment with parent postid
router.post('/post=:postid', verifyToken, (req, res) => {
    const postID = req.params.postid;

    try {
        const newComment = {
            content: req.body.content,
            parentPost: postID
        }

        Comment.create(req.userData.user_id, newComment)
        .then(comment => {
            res.status(200).json(comment);
        });

    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
})

//Create a new comment with parent postid and parent comment
router.post('/post=:postid/comment=:commentid', verifyToken, (req, res) => {
    const postID = req.params.postid;
    const commentID = req.params.commentid;

    try {
        const newComment = {
            content: req.body.content,
            parentComment: commentID,
            parentPost: postID
        }

        Comment.create(req.userData.user_id, newComment)
        .then(comment => {
            res.status(200).json(comment);
        });

    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
})

module.exports = router;