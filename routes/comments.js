const express = require('express');

const Post = require('../db/post');
const Comment = require('../db/comment');
const verifyToken = require('../middleware/verify-token');

const router = express.Router();

// Return a comment by id
router.get('/id=:id', (req, res) => {
    Comment.getOneById(req.params.id).then(comment => {
        if(!comment) return res.json({message: 'Comment does not exist.'});
        return res.json(comment);
    })
});

// Update a comment by id
router.put('/id=:id', verifyToken, (req, res) => {
    try {
        Comment.getOneById(req.params.id).then(comment => {
            //If the comment was not created by the person attempting to update it, throw a 403
            if(comment.author == req.userData.user_id || req.userData.role === 'admin') {
                const newComment = req.body.comment;
                newComment.updated = new Date();
                Comment.update(req.params.id, newComment).then(updatedComment => {
                    res.json(updatedComment);
                })
            } else {
                const err = new Error('Forbidden.')
                err.status = 403;
                next(err);
            }
        })
    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
});

router.delete('/id=:id', verifyToken, (req, res) => {
    try {
        Comment.getOneById(req.params.id)
        .then(comment => {
            if(!comment) return res.json({message: 'comment does not exist.'});
            if (comment.author === req.userData.user_id || req.userData.role === 'admin') {
                comment.delete(req.params.id)
                .then(() => {
                    res.json({
                        message: 'Comment deleted.'
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
    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
});

// Get all comment with parent post id
router.get('/parentpost=:postid', (req, res) => {
    if(req.params.postid){
        //get all comments with parent postid
        try {
            const postID = req.params.postid;
            Post.getOneById(postID).then(post => {
                if(!post) return res.json({message: 'Parent post does not exist.'});
                Comment.getAllByParentPost(postID).then(comments => {
                    res.json(comments);
                })
            });
        } catch {
            const err = new Error('Server error.')
            err.status = 500;
            next(err);
        }
    };
});

//Create a new comment with parent postid
router.post('/parentpost=:postid', verifyToken, (req, res) => {
    // Check if parent post exists
    try {
        const postID = req.params.postid;
        Post.getOneById(postID).then(post => {
            if(!post) return res.json({message: 'Parent post does not exist.'});
            const newComment = {
                content: req.body.content,
                parentPost: postID
            }
    
            Comment.create(req.userData.user_id, newComment)
            .then(comment => {
                res.status(200).json(comment);
            });
        });
    } catch {
        const err = new Error('Server error.')
        err.status = 500;
        next(err);
    }
})

//Create a new comment with parent postid and parent comment
router.post('/parentpost=:postid/parentcomment=:commentid', verifyToken, (req, res) => {
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