require('dotenv').config();

const knex = require('knex')({

    client: 'postgresql',

    connection: 'postgres://kdimywow:6SAdrtRXF2tzPs8LNDa6Av5CjHyIq-rA@babar.db.elephantsql.com/kdimywow'

    // host: process.env.HOST,
    // user: process.env.USER,
    // port: process.env.PORT,
    // password: process.env.PASSWORD,
    // database: process.env.DATABASE,




});

knex.raw('SELECT 1+1 AS result')
    .then(() => {
        console.log('Conexão bem-sucedida!');
        // Faça outras operações com o Knex aqui
    })
    .catch((error) => {
        console.error('Erro ao conectar:', error);
    })
    .finally(() => {
        // Encerre a conexão com o banco de dados
        knex.destroy();
    });

module.exports = knex;