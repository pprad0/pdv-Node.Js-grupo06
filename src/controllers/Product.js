const knex = require('../db/Connection')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const categoriaExiste = await knex('categorias').where("id", "=", categoria_id).first()
        if (!categoriaExiste) {
            return res.status(400).json({ messagem: 'Categoria não encontrada, informe outra categoria.' })
        }

        const inserirProduto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        return res.status(200).json()


    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}


module.exports = {
    cadastrarProduto
}



