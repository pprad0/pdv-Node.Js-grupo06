const express = require('express');
const messages =require ('joi-translation-pt-br')
const schema = require("../models/userSchema");

 
const validationMiddlewareUser = (request, response, next) => {
  const { nome, email, senha } = request.body
  const result = schema.schema.validate({nome:nome,email:email,senha:senha}, {messages})

  if(result.error){
    
    response.status(400).json({  "mensagem": result.error.message })
  }else{
    next()
  }
    
 
  
}

module.exports = validationMiddlewareUser