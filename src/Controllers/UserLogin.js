const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaHash = require('../SenhaHash');
const knex = require('../db/Connection')
const schema = require('../models/loginSchema')


const loginUser = async (req, res) => {
    const { email, senha } = req.body;



    try {
        const usuario = await knex('usuarios').where({ email }).first()

        process.on('SIGINT', async () => {
            await knex.destroy();
            process.exit(0);
        })

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
        return res.status(500).json(error.message)
        // return res.status(500).json('Erro interno do servidor !')

    }

}

module.exports = loginUser;