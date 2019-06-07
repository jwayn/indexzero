const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('comments').where('id', id).first();
    },
    getAllByEmail: function(email) {
        return knex('comments').join('users', 'comments.author', '=', 'users.id').where('users.email', email)
        .select('comments.created', 'comments.id', 'comments.score', 'comments.content', 'comments.score', 'comments.updated', 'users.email', 'users.display_name', 'users.score')
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
            , 'content').then(comments => {
            return comments[0];
        });
    }
};