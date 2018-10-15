const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const foodsController = require('./lib/controllers/foods_controller')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

// ROOT
app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
})

const foods = require('./lib/routes/api/v1/foods')
app.use('/api/v1/foods', foods)


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app

