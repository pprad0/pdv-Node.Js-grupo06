const knex = require('../db/Connection')

const listarCategories = async (req, res) => {

    try {
        console.log("teste1")
        const categoriaListar = await knex('categorias').returning('*')
        console.log("teste2")
        return res.status(200).json(categoriaListar)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: error })
    }
}



module.exports = listarCategories;