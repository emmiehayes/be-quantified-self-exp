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
}

module.exports = mealsController
