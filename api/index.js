const express = require('express')
const mongoose = require('mongoose')
const {URL} = require('url')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.set('trust proxy', true)
app.use(express.static(path.join(__dirname, '../dist')))
mongoose.Promise = Promise

let mongoUrl = new URL(`mongodb://localhost/parser`)

mongoose.connect(mongoUrl.href, function (error) {
  if (error) throw error
})

const api = express.Router()
const article = require('./routes/article')

app.use('/api', api)
api.use('/article', article)

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')))

app.use(function (req, res, next) {
  throw new Error('Not found.')
})

app.use(function (err, req, res, next) {
  res.status(500).json({error: err.message})
})

app.listen(8000, () => {
  console.log('server is running.')
})
