const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('posts').where('id', id).first();
    },
    getAllByEmail: function(email) {
        return knex('posts').join('users', 'posts.author', '=', 'users.id').where('users.email', email)
        .select('posts.created', 'posts.id', 'posts.summary', 'posts.content', 'posts.score', 'posts.updated', 'users.email', 'users.score', 'users.first_name', 'users.last_name')
    },
    create: function(user_id, post) {
        return knex('posts').insert(
            {
                author: user_id,
                summary: post.summary,
                content: post.content,
                created: new Date(),
                score: 0
            }
            ).then(ids => {
            return ids[0];
        });
    }
};