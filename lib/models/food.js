const environment = process.env.NODE_ENV || 'development'
const configuration = require('../../knexfile')[environment]
const database = require('knex')(configuration)

class Food {

  static all() {
    return database('foods')
  }

  static find(id) {
    return database('foods')
    .where('id', id)
  }

  static create(food) {
    return database('foods')
    .insert(food, 'id')
  }

  static delete(id) {
    return database('foods')
    .where('id', id)
    .del()
  }

  static update(id, foodData) {
    console.log(foodData)
    return database('foods')
    .where('id', id)
    .update(foodData)
  }

}

module.exports = Food