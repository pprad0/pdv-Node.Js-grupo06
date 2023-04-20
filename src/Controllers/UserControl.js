const knex = require('../db/Connection')
const bcrypt = require('bcrypt');;


const cadastrarUser = async (req, res) => {
    const { nome, email, senha } = req.body

    if (!nome || !email || !senha) {
        return res.status(400).json('A informação do nome, email e senha são parametros obrigatórios !')
    }

    try {
        const existeEmail = await knex('usuarios').where({ email }).first()

        if (existeEmail) {
            return res.status(400).json('Email já cadastrado !')
        }

        const senhAcrip = await bcrypt.hash(senha, 10)

        const usuario = await knex('usuarios').insert({
            nome,
            email,
            senha: senhAcrip
        })

        return res.status(201).send()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

const detalharUser = (req, res) => {
    console.log(usuario)
}



module.exports = {
    cadastrarUser,
    detalharUser
};