const jwt = require('jsonwebtoken')
const senhaHash = require('../SenhaHash');
const knex = require('../Connection')

const autenticarUser = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json({ mensagem: 'Não autorizado !' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, senhaHash)

        const userExistente = await knex('usuarios').where({ id }).first()

        if (!userExistente) {
            return res.status(404).json({ mensagem: 'Não autorizado !' })
        }

        const { senha: _, usuario } = rows[0]

        req.usuario = usuario
        next()

    } catch (error) {

        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

module.exports = autenticarUser;