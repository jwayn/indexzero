const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('users').where('id', id).first();
    },
    getOneByEmail: function(email) {
        return knex('users').where('email', email).first();
    },
    create: function(user) {
        return knex('users').insert(user, ['id', 'role']).then(userData => {
            console.log(userData);
            return {
                id: userData[0].id,
                role: userData[0].role
            };
        });
    }
};