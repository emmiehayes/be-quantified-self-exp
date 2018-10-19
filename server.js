const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

const foodsController = require('./lib/controllers/foods_controller')
const mealsController = require('./lib/controllers/meals_controller')
const mealFoodsController = require('./lib/controllers/meal_foods_controller')

app.use(cors())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

// ROOT
app.get('/', (request, response) => {
  response.send('Welcome to Quantified Self!')
})

const foods = require('./lib/routes/api/v1/foods')
const meals = require('./lib/routes/api/v1/meals')


app.use('/api/v1/foods', foods)
app.use('/api/v1/meals', meals)


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app

