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

  static show(request, response) {
    const id = request.params.id
    Meal.find(id)
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

  static create(request, response) {
    const meal = request.body

    for (let requiredParameter of ['name']) {
      if (!meal[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
      }
    }

    Meal.create(meal)
      .then((meal) => {
        response.status(201).json({ id: meal[0] })
      })
      .catch((error) => {
        response.sendStatus(500)
      })
  }

  static delete(request, response) {
    const id = request.params.id
    Meal.delete(id)
      .then(meal => {
        if (meal) {
          response.sendStatus(204)
        } else {
          response.sendStatus(404)
        }
      })
      .catch(error => {
        response.sendStatus(500)
      })
  }

  static update(request, response) {
    const id = request.params.id
    const mealData = request.body

    for (let requiredParameter of ['name']) {
      if (!mealData[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
      }
    }

    Meal.update(id, mealData)
      .then((meal) => {
        if (meal) {
          response.status(202).json({ message: `Meal with id:${id} was successfully updated.` })
        } else {
          response.sendStatus(404)
        }
      })
      .catch(error => {
        response.sendStatus(500)
      })
  }
}

module.exports = mealsController
