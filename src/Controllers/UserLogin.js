const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../SenhaHash');
const knex = require('../Connection')


const loginUser = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json('É obrigatória a informação de e-mail e senha !')
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(404).json('Usuario não encontrado !')
        }

        const validarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!validarSenha) {
            return res.status(400).json('Email e/ou senha incorretos !')
        }

        const token = jwt.sign({ id: usuario.id }, senhaHash, { expiresIn: '8h' });

        const { senha: _, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json('Erro interno do servidor !')
    }

}

module.exports = loginUser;