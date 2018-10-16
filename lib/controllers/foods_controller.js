const Food = require('../models/food')

class foodsController {

  static index(request, response){
    Food.all()
    .then((foods) => {
      response.status(200).json(foods)
    })
    .catch((error) => {
      response.sendStatus(500)
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
    .catch ((error) => {
        response.sendStatus(500)
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
      response.sendStatus(500)
    })
  }

  static delete(request, response) {
    const id = request.params.id
    Food.delete(id)
    .then(food => {
      if (food) {
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
    const foodData = request.body

    for (let requiredParameter of ['name', 'calories']) {
      if (!foodData[requiredParameter]) {
        return response
          .status(422)
          .send({ error: `Expected format: { name: <String>, calories: <String> }. You're missing a "${requiredParameter}" property.` })
      }
    }

    Food.update(id, foodData)
      .then((food) => {
        if (food) {
          response.status(202).json({ message: `Food with id:${id} was successfully updated.`})
        } else {
          response.sendStatus(404)
        }
      })
      .catch(error => {
        response.sendStatus(500)
      })
  }
}

module.exports = foodsController


