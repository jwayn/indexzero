const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('tags').where({id}).first();
    },
    getOneByName: function(name) {
        return knex('tags').where({name}).first();
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
    create: function(name) {
        return knex('tags').insert({name})
            .returning(['id']);
    },
    delete: function(id) {
        return knex('tags')
            .where({id})
            .del()
    }
};