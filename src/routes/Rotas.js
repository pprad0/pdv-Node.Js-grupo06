const express = require('express')
const rotas = express();

//importação User
const { cadastrarUser, detalharUser, editarUser } = require('../controllers/User');
const validationMiddlewareUser = require('../middlewares/userValidate');
const autenticarUser = require('../middlewares/userAuth');

// importação Login
const loginUser = require('../controllers/Login');
const loginValidationMiddleware = require('../middlewares/loginValidate')

//importação Product
const produto = require('../controllers/Product')
const productValidation = require('../middlewares/productValidate')

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
