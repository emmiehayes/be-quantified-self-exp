const MealFood = require('../models/meal_food')

class mealFoodsController {

  static create(request, response) {
    const mealFood = request.body

    for (let requiredParameter of ['food_id', 'meal_id']) {
      if (!mealFood[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { food_id: <Integer>, meal_id: <Integer> }. You're missing a "${requiredParameter}" property.` })
      }
    }

    MealFood.create(mealFood)
      .then((mealFood) => {
        response.status(201).json({ 'message': `Food was successfully added to meal` })
      })
      .catch((error) => {
        response.sendStatus(500)
      })
  }

  static delete(request, response) {
    const id = request.params.id
    MealFood.delete(id)
      .then(food => {
        if (food.length) {
          response.status(204).json({ 'message': `Food was successfully removed from meal` })
        } else {
          response.sendStatus(404)
        }
      })
      .catch(error => {
        response.sendStatus(500)
      })
  }
}

module.exports = mealFoodsController

 