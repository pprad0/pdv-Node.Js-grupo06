const knex = require('../db/Connection')

const cadastrarCliente = async (req, res) => {

    const { nome, email, cpf } = req.body;

    if(!nome || !email || !cpf){
        return res.status(400).json({mensagem: 'A informação do nome, email e cpf são parametros obrigatórios !'});
    }

    try {      

        const client = await knex('clientes').insert({
        nome, 
        email, 
        cpf,
        })
            
        return res.status(201).send()

    } catch (error) {
        console.log(error)
        return res.status(500).json({mensagem: 'O servidor apresentou um erro !'});
    }

}


const editarCliente = async (req, res) => {
    const { nome, email, cpf } = req.body;
    const { authorization } = req.headers;

    if (!nome, !email, !cpf) {
        return res.status(400).json({ mensagem: 'É obrigatório o preenchimento de todos os campos!' })
    };


    try {

        const emailDuplicado = await knex('clientes').where("email", email);
        const cpfDuplicado = await knex('cleintes').where("cpf", cpf);

        if (emailDuplicado || cpfDuplicado) {
            return res.status(400).json({ mensagem: 'E-mail e/ou CPF já estão sendo utilizados!' });
        };


        const token = authorization.split(' ')[1]
        const { id } = await jwt.verify(token, senhaHash);

        const validarUsuario = await knex('clientes').where("id", id);
        if (!validarUsuario) {
            return res.status(400).json({ mensagem: 'Não autorizado!' })
        } else {
            const editarCliente = await knex('clientes').update({
                nome,
                email,
                cpf
            });
        };

        return res.status(201).json({ mensagem: 'Cliente atualizado com sucesso!' })

    }
    catch (erro) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    };



};


const listarClientes = async (req,res) => {

    try{

        clientesListar = await knex('clientes').returning('*');
        return res.status(200).json(clientesListar);

    }catch {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !'});
    }

}


const detalharCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const encontrarCliente = await knex('clientes').where("id", id);

        return res.status(200).json(editarClientes.rows[0]);


    } catch (error) {
        return res.status(500).json({ mensagem: 'O servidor apresentou um erro !' })
    }
};

module.exports = {
    cadastrarCliente,
    editarCliente,
    listarClientes,
    detalharCliente

};
