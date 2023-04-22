const express = require('express')
const rotas = express();

const listarCategories = require('../Controllers/CategoryControl');
const autenticarUser = require('../Middlewares/UserAutentica');
const loginUser = require('../Controllers/UserLogin');
const { cadastrarUser, detalharUser, editarUser } = require('../Controllers/UserControl');

rotas.post('/usuario', cadastrarUser)
rotas.get('/categorias', listarCategories)
rotas.post('/login', loginUser)

rotas.use(autenticarUser)

rotas.get('/usuario', detalharUser)
rotas.put('/usuario', editarUser)

module.exports = rotas;