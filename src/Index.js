const express = require('express')
const rotas = require('./rotas')
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(rotas)
app.use(cors())

const port = process.env.PORT || 3000
app.listen(port)