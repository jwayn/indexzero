const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('comments').where('id', id).first();
    },
    getAllByEmail: function(email) {
        return knex('comments').join('users', 'comments.author', '=', 'users.id').where('users.email', email)
        .select('comments.created', 'comments.id', 'comments.score', 'comments.content', 'comments.score', 'comments.updated', 'users.email', 'users.display_name')
    },
    getAllByParentPost: function(postid) {
        return knex('comments')
        .join('posts', 'comments.parent_post', '=', 'posts.id').where('posts.id', postid)
        .join('users', 'comments.author', '=', 'users.id')
        .select('comments.created', 'comments.id', 'comments.score', 'comments.content', 'comments.score', 'comments.updated', 'users.email', 'users.display_name')
        .orderBy('comments.created', 'desc')
        .orderBy('comments.updated', 'desc')
    },
    create: function(user_id, comment) {
        return knex('comments').insert(
            {
                author: user_id,
                content: comment.content,
                parent_comment: comment.parentComment ? comment.parentComment : null,
                parent_post: comment.parentPost,
                created: new Date(),
                score: 0
            }
            , '*').then(comments => {
            return comments[0];
        });
    },
    update: function(comment) {
        return knex('comments')
            .where({id: comment.id})
            .update(comment)
            .then(comment => {
                return comment;
            });
    },
    delete: function(commentId) {
        return knex('comments')
            .where({id: commentId})
            .del()
    }
};