const Joi = require('joi')
  
//User-defined function to validate the user
const schema = Joi.object({
    nome: Joi.string()
        
        .min(3)
        .max(30)
        .required(),
 
    senha: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
 
 
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required("O campo é obrigatório."),
})

module.exports = {
    schema
}