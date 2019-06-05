const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('users').where('id', id).first();
    },
    getOneByEmail: function(email) {
        return knex('users').where('email', email).first();
    }
};