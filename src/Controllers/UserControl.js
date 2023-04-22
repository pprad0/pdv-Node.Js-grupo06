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

        process.on('SIGINT', async () => {
            await knex.destroy();
            process.exit(0);
        })

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json(error.message)

        // return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

const detalharUser = async (req, res) => {
    res.status(200).json({ usuario: req.usuario })
}

const editarUser = async (req, res) => {
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

        const usuario = await knex('usuarios')
            .where('id', '=', req.usuario.id)
            .update({
                nome,
                email,
                senha: senhAcrip
            })

        return res.status(201).send()

    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

module.exports = {
    cadastrarUser,
    detalharUser,
    editarUser
};