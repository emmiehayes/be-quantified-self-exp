const Meal = require('../models/meal')

class mealsController {

  static index(request, response) {
    Meal.all()
    .then((meals) => {
      response.status(200).json(meals)
    })
    .catch((error) => {
      response.sendStatus(500)
    })
  }

  static show(request, response){
    Meal.find(request.params.id)
    .then((meal) => {
      if (meal.length) {
        response.status(200).json(meal)
      } else {
        response.sendStatus(404)
      }
    })
    .catch((error) => {
      response.sendStatus(500)
    })
  }
}


module.exports = mealsController
