const { isNumber } = require('class-validator')
const knex = require('../db/Connection')
const { id } = require('../models/productSchema')

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body

    try {
        const categoriaExiste = await knex('categorias').where("id", "=", categoria_id).first()
        if (!categoriaExiste) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada, informe outra categoria.' })
        }

        const inserirProduto = await knex('produtos')
            .insert({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        return res.status(201).json()


    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

const atualizarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {
        const categoriaExiste = await knex('categorias')
            .where("id", "=", categoria_id)
            .first()

        if (!categoriaExiste) {
            return res.status(404).json({ messagem: 'Categoria não encontrada, informe outra categoria.' })
        }


        const existeProduto = await knex('produtos')
            .where({ id })
            .first()

        if (!existeProduto) {
            return res.status(404).json({ mensagem: "Produto não existe, informe outro 'id' " })
        }


        const atualizarProduto = await knex('produtos')
            .where('id', '=', id)
            .update({
                descricao,
                quantidade_estoque,
                valor,
                categoria_id
            })

        return res.status(201).json()
    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }

}
function validarId(id, res) {

    return !isNaN(id)


}

const listarProdutosPorCategoria = async (req, res) => {

    const { categoria_id } = req.query

    if (validarId(categoria_id)) {

        if (categoria_id) {
            try {

                const produtosListar = await knex.raw('SELECT p.*,categorias.descricao as categoria FROM produtos as p JOIN categorias  ON categoria_id = categorias.id WHERE categoria_id=? ', categoria_id)
                return res.status(200).json({ listagem: produtosListar.rows })
            } catch (error) {
                return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
            }
        } else {
            try {
                const produtosListar = await knex.raw('SELECT p.*,categorias.descricao as categoria FROM produtos as p JOIN categorias  ON categoria_id = categorias.id  ')
                return res.status(200).json({ listagem: produtosListar.rows })
            } catch (error) {
                return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
            }
        }

    } else {
        return res.status(400).json({ mensagem: 'Parâmetro inválido,Insira somente números !' })

    }
}
async function consultarProduto(id) {


    const produtoExiste = await knex('produtos')
        .where("id", "=", id)
        .first()

    return produtoExiste ? produtoExiste : false


}
const listarProduto = async (req, res) => {

    const { id } = req.params
    if (validarId(id)) {
        const produto = await consultarProduto(id)

        if (produto) {
            return res.status(200).json(produto)
        } else {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }
    } else {
        return res.status(400).json({ mensagem: 'Parâmetro inválido,Insira somente números !' })
    }


}
const excluirProduto = async (req, res) => {

    const { id } = req.params

    if (validarId(id)) {
        const produto = await consultarProduto(id)
        if (produto) {
            try {
                const teste = await knex("produtos").del().where({ id: produto.id })
                return res.status(200).json({ mensagem: "Produto excluido com sucesso!!" })
            } catch (error) {
                return res.status(404).json({ mensagem: "Produto não encontrado" })
            }
        } else {
            return res.status(404).json({ mensagem: "Produto não encontrado" })
        }
    } else {
        return res.status(400).json({ mensagem: 'Parâmetro inválido,Insira somente números !' })
    }

}

module.exports = {
    cadastrarProduto,
    atualizarProduto,
    listarProdutosPorCategoria,
    listarProduto,
    excluirProduto
}



