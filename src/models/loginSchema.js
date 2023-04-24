const Joi = require('joi')
  
//User-defined function to validate the user
const loginSchema = Joi.object({
    
 
    senha: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
 
 
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
})

module.exports = {
    schema
}