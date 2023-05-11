const knex = require('../db/Connection');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    if (!cliente_id || !pedido_produtos) {
        return res.status(400).json({ mensagem: 'Preenchimento dos campos obrigatório!' });
    };

    try {

        const clienteExiste = await knex('clientes').where('id', "=", cliente_id).first();
        if (!clienteExiste) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado!' });
        };


        // const manipularPedido = JSON.parse(pedido_produtos);
        let cadastrarTodosItens = [];


        for (let i of pedido_produtos) {

            const encontrarProduto = await knex('produtos').where('id', "=", i.produto_id).first();
            if (!encontrarProduto) {
                return res.status(400).json({ mensagem: 'Produto não encontrado!' });
            };

            if (encontrarProduto.quantidade_estoque < i.quantidade_produto) {
                return res.status(400).json({ mensagem: 'Estoque insuficiente!' });
            }

            let pedido = {
                cliente_id,
                observacao,
                produto_id: i.produto_id,
                quantidade_produto: i.quantidade_produto
            };

            cadastrarTodosItens.push(pedido);

        };

        await knex('pedidos').insert({ cadastrarTodosItens });

        return res.status(200).json();


    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


module.exports = { cadastrarPedido };
