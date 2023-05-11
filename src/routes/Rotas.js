const express = require('express')
const rotas = express();

//importação User
const user = require('../controllers/User');
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

//importação de Clientes
const { cadastrarCliente, editarCliente, listarCliente, detalharCliente } = require('../controllers/Clients');

//importacao cadastrar pedidos
const { cadastrarPedido } = require('../controllers/Requests');

rotas.get('/', express.static("desafio-front"));
rotas.get('/produtos', express.static("desafio-front"));
rotas.post('/login', loginValidationMiddleware, loginUser);
rotas.post('/usuario', validationMiddlewareUser, user.cadastrarUser);
rotas.get('/categoria', listarCategories);


rotas.use(autenticarUser);

rotas.get('/usuario', user.detalharUser);
rotas.put('/usuario', validationMiddlewareUser, user.editarUser);
rotas.post('/produto', productValidation, produto.cadastrarProduto);
rotas.put('/produto/:id', productValidation, produto.atualizarProduto);
rotas.get('/produto', produto.listarProdutosPorCategoria);
rotas.get('/produto/:id', produto.listarProduto);
rotas.delete('/produto', produto.excluirProduto);
rotas.delete('/produto/:id', produto.excluirProduto);

//rotas.post('/cliente', cadastrarCliente);
rotas.put('/cliente/:id', editarCliente);
//rotas.get('/cliente', listarClientes);
rotas.get('/cliente/:id', detalharCliente);

//cadastrar pedidos
rotas.post('/pedido', cadastrarPedido);

module.exports = rotas;
