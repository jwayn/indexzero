const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('tags').where('id', id).first();
    },
    getAll: function() {
        return knex('tags').select();
    },
    getAllByPost: function(post_id) {
        return knex('tags_posts')
            .where('post_id', post_id)
            .join('tags', 'tags_posts.tag_id', '=', 'tags.id')
            .select('tags.name', 'tags.id')
    },
    getAllLimited: function(limit) {
        return knex('tags').select().limit(limit);
    },
    create: function(user_id, post) {
        return knex('tags').insert(
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