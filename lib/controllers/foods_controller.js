const Food = require('../models/food')

class foodsController {

  static index(request, response){
    Food.all()
    .then((foods) => {
      response.status(200).json(foods)
    })
    .catch((error) => {
      response.status(500).json({ error })
    })
  }

  static show(request, response){
    const id = request.params.id
    Food.find(id)
    .then((food) => {
      if(food.length) {
        response.status(200).json(food)
      } else {
        response.sendStatus(404)
      }
    })
  }

  static create(request, response) {
    const food = request.body

    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String>, calories: <String> }. You're missing a "${requiredParameter}" property.` })
      }
    }

    Food.create(food)
      .then((food) => {
        response.status(201).json({ id: food[0] })
      })
      .catch((error) => {
        response.status(500).json({ error })
      })
  }

  static delete(request, response) {
    const id = request.params.id
    Food.delete(id)
      .then(() => {
        response.sendStatus(204)
      })
      .catch(() => {
        response.sendStatus(404)
      })
  }
}

module.exports = foodsController


