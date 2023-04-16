const express = require('express')
const rotas = require('./Rotas')

const app = express()

app.use(express.json())

app.use(rotas)


app.listen(3000)