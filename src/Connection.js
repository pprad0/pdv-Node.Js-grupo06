require('dotenv').config();

const knex = require('knex')({

    client: 'pg',

    connection: {
        host: "postgres://dkgyjraf:WfayKCipRg4sICwWlCGKa0sz6ptJ0INk@babar.db.elephantsql.com/dkgyjraf",
        port: '5432',
        user: "dkgyjraf",
        password: "dkgyjraf",
        database: "pdv"
    },

});


module.exports = knex;