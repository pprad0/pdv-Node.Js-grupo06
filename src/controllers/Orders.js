const knex = require('../db/Connection');

const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body;

    if (!cliente_id || !pedido_produtos) {
        return res.status(400).json({ mensagem: 'Preenchimento dos campos obrigatório!' });
    };

    try {

        const clienteExiste = await knex('clientes').where('id', "=", cliente_id).first();
        if (!clienteExiste) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        };


        let cadastrarTodosItens = [];
        for (let item of pedido_produtos) {

            if (!item.produto_id || item.produto_id <= 0 || !item.quantidade_produto || item.quantidade_produto <= 0) {
                return res.status(400).json({ mensagem: 'Produto_id e quantidade_produto precisam estar preenchidos. Verifique se não foram colocados valores menores que 1 (um) nestes campos.' });
            }

            const encontrarProduto = await knex('produtos').where('id', "=", item.produto_id).first();
            if (!encontrarProduto) {
                return res.status(404).json({ mensagem: 'Produto não encontrado!' });
            };

            if (encontrarProduto.quantidade_estoque < item.quantidade_produto) {
                return res.status(400).json({ mensagem: 'Estoque insuficiente!' });
            }


            let pedido = {
                cliente_id,
                observacao: observacao || null,
                produto_id: item.produto_id,
                quantidade_produto: item.quantidade_produto
            }

            cadastrarTodosItens.push(pedido);
        };

        await knex('pedidos').insert(cadastrarTodosItens);

        return res.status(201).json();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


module.exports = { cadastrarPedido };
