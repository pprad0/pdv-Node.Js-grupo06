const jwt = require('jsonwebtoken')
const senhaHash = require('../SenhaHash');
const knex = require('../db/Connection')

const autenticarUser = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(404).json({ mensagem: 'Não autorizado !' })
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, senhaHash, function(err, decoded) { 
        if (err) 
            return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
        
            req.usuario = decoded.id; 
        
        next(); 
    }); 
    
    try {
        const { id } = jwt.verify(token, senhaHash)

        const userExistente = await knex('usuarios').where({ id }).first()

        process.on('SIGINT', async () => {
            await knex.destroy();
            process.exit(0);
        })

        if (!userExistente) {
            return res.status(404).json({ mensagem: 'Não autorizado !' })
        }

        const { senha: _, ...usuario } = userExistente

        req.usuario = usuario
        next()

    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
}

module.exports = autenticarUser;