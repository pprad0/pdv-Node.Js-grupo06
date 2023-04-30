const express = require('express')
const rotas = express();
const path = require('path');

//importação User
const { cadastrarUser, detalharUser, editarUser } = require('../controllers/User');
const validationMiddlewareUser = require(path.join(__dirname, '../middlewares/userValidation.js'));
const autenticarUser = require('../middlewares/UserAutentica');

// importação Login
const loginUser = require('../controllers/UserLogin');
const loginValidationMiddleware = require('../middlewares/loginValidation')

//importação Product
const produto = require('../controllers/Product')
const productValidation = require('../middlewares/productValidation')

//importação Category
const listarCategories = require('../controllers/Category');

rotas.get('/', express.static("desafio-front"));
rotas.get('/produtos', express.static("desafio-front"));
rotas.post('/login', loginValidationMiddleware, loginUser);
rotas.post('/usuario', validationMiddlewareUser, cadastrarUser);
rotas.get('/categoria', listarCategories);


rotas.use(autenticarUser);

rotas.get('/usuario', detalharUser);
rotas.put('/usuario', validationMiddlewareUser, editarUser);
rotas.post('/produto', productValidation, produto.cadastrarProduto)
rotas.put('/produto/:id', productValidation, produto.atualizarProduto)

module.exports = rotas;
