const knex = require('./connection');

module.exports = {
    getOneById: function(id) {
        return knex('users').where('id', id).first();
    },
    getOneByEmail: function(email) {
        return knex('users').where('email', email).first();
    },
    create: function(user) {
        return knex('users').insert(user, ['id', 'role', 'email']).then(userData => {
            console.log(userData);
            return {
                id: userData[0].id,
                role: userData[0].role,
                email: userData[0].email
            };
        });
    },
    createVerification(user_id, key){
        return knex('user_verification').insert({user_id, key}).then(userData => {
            return {
                key
            }
        })
    },
    getOneByVerificationKey(key) {
        return knex('user_verification').select('user_id').where({key}).first();
    },
    deleteActivationRecord(user_id) {
        return knex('user_verification').where({user_id}).delete();
    },
    update: function(id, user) {
        return knex('users').update(user).where({id});
    }
};