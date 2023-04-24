const express = require('express');
const messages =require ('joi-translation-pt-br')
const loginSchema = require("../models/loginSchema");

 
const loginValidationMiddleware = (request, response, next) => {
  const { email, senha } = request.body
  console.log(request.body)
  const result = loginSchema.schema.validate({email:email,senha:senha}, {messages})

  if(result.error){
    
    response.status(400).json({  "mensagem": result.error.message })
  }else{
    next()
  }
}

module.exports = loginValidationMiddleware