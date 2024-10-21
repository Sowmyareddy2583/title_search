const express = require('express')
const app = express()
const movieRouter = require('./router/movieRoute')
const cors = require('cors');
app.use(cors());


app.use(express.json())

app.use('/api/movies',movieRouter)

module.exports = app