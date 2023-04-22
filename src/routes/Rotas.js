const express = require('express')
const rotas = express();

const listarCategories = require('../Controllers/CategoryControl');
const autenticarUser = require('../Middlewares/UserAutentica');
const loginUser = require('../Controllers/UserLogin');
const { cadastrarUser, detalharUser, editarUser } = require('../Controllers/UserControl');

rotas.get('/',express.static("desafio-front"))
rotas.post('/usuario', cadastrarUser)
rotas.get('/categorias', listarCategories)
rotas.post('/login', loginUser)

//rotas.use(autenticarUser)

rotas.get('/usuario', detalharUser,autenticarUser)
rotas.put('/usuario', editarUser,autenticarUser)

module.exports = rotas;