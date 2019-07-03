const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('posts').where('id', id).first();
    },
    getPostLikes: function(id) {
        return knex('posts_likes').count('post_id').where('post_id', id).first();
    },
    getPostUserLike: function(post_id, user_id) {
        return knex('posts_likes')
            .count()
            .where({post_id, user_id})
            .first();
    },
    addPostLike: function(user_id, post_id) {
        return knex('posts_likes').insert({user_id, post_id})
        .returning(['post_id']);
    },
    removePostLike: function(user_id, post_id) {
        return knex('posts_likes').where({post_id, user_id}).del();
    },
    getPostViews: function(id){
        return knex('posts_views').count('post_id').where('post_id', id).first();
    },
    addPostView: async function(address, post_id) {
        let exists = await knex('posts_views').where({address, post_id});
        if(exists.length == 0) {
            return await knex('posts_views').insert({address, post_id}, ['address'])
        }
    },
    addPostTag: function(tag_id, post_id) {
        return knex('tags_posts')
            .insert({tag_id, post_id});
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
                identity: post.identity
            }, ['summary', 'content', 'id']
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