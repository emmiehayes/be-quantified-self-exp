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
}

module.exports = foodsController


