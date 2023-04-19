const express = require('express')
const rotas = require('./Rotas')
const cors = require('cors');

const app = express()

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))
app.use(express.json())

app.use(rotas)


app.listen(3000)