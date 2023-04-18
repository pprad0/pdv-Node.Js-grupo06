const knex = require('../connection')

const listarCategories = async (req, res) => {
    try {
        const categoriaListar = await knex('categorias').returning('*')
        return res.status(200).json(categoriaListar)

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}



module.exports = listarCategories;