const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('posts').where('id', id).first();
    },
    getAll: function() {
        return knex('posts').select();
    },
    getAllLimited: function(limit) {
        return knex('posts').select().orderBy('created', 'desc').orderBy('updated', 'desc').limit(limit);
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
            }, ['summary', 'content']
            ).then(posts => {
            return posts[0];
        });
    },
    delete: function(post_id) {
        return knex('posts')
            .where({id: post_id})
            .del()
    },
    update: function(post_id, post) {
        return knex('posts')
            .where({id: post_id})
            .update(post)
            .then(post => {
                return post;
            });
    }
};