const express = require('express')
const rotas = express();

//importação User
const { cadastrarUser, detalharUser, editarUser } = require('../controllers/User');
const validationMiddlewareUser = require('../Middlewares/userValidation');
const autenticarUser = require('../Middlewares/UserAutentica');

// importação Login
const loginUser = require('../Controllers/UserLogin');
const loginValidationMiddleware = require('../Middlewares/loginValidation')

//importação Product
const produto = require('../controllers/Product')
const productValidation = require('../middlewares/productValidation')

//importação Category
const listarCategories = require('../Controllers/Category');

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
