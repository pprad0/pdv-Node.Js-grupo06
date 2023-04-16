const knex = require('knex')({

    client: 'pg',

    connection: {
        host: 'localhost',
        port: 5000,
        user: 'postgres',
        password: 'tretAdo66',
        database: 'pdv'
    },

});


module.exports = knex;