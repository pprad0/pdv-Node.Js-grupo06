require('dotenv').config();

const knex = require('knex')({

    client: 'pg',

    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
<<<<<<< HEAD
        database: process.env.DATABASE,
=======
        database: process.env.DATABASE
>>>>>>> 09b6192ddc018849ffdfbf500275c7ef21514384
    },

});



module.exports = knex;