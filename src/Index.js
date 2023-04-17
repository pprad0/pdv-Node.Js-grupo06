const express = require('express')
const rotas = require('./Rotas')
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(rotas)
app.use(cors())


app.listen(3000)